# NestJS Best Practices & Standards

NestJS is the standard Node.js framework for enterprise APIs. Its Angular-inspired architecture enforces clear separation of concerns through modules, controllers, services, and dependency injection.

---

## Quick Start

```bash
npm install -g @nestjs/cli
nest new my-api --package-manager npm

cd my-api
npm install @prisma/client prisma
npm install @nestjs/config @nestjs/jwt passport passport-jwt @nestjs/passport
npm install class-validator class-transformer
npm install @nestjs/throttler helmet
npm install --save-dev @types/passport-jwt
```

---

## Generating Code with the CLI

Always use the NestJS CLI - never create module files by hand.

```bash
# Generate a full CRUD resource (module + controller + service + DTO + entity)
nest generate resource users

# Generate individual pieces
nest g module orders
nest g controller orders --no-spec
nest g service orders
nest g guard jwt-auth
nest g filter http-exception
nest g interceptor logging
nest g pipe validation
nest g decorator current-user
```

---

## Module Structure

Every feature is a self-contained module. Register everything through the IoC container - never use `new`.

```ts
// src/modules/users/users.module.ts
import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { DatabaseModule } from '@/database/database.module'

@Module({
  imports: [DatabaseModule],          // Import what this module depends on
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],            // Export services that other modules need
})
export class UsersModule {}
```

```ts
// src/app.module.ts - Root module
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    OrdersModule,
  ],
})
export class AppModule {}
```

---

## Controllers - HTTP Routing Only

Controllers accept requests, validate input via DTOs, and call services. No business logic here.

```ts
// src/modules/users/users.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { RolesGuard } from '@/common/guards/roles.guard'
import { Roles } from '@/common/decorators/roles.decorator'
import { CurrentUser } from '@/common/decorators/current-user.decorator'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneOrThrow(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: TJwtPayload,
  ) {
    return this.usersService.update(id, dto, user)
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id)
  }
}
```

---

## Services - Business Logic

Services hold all business logic. They are injected, testable, and framework-agnostic.

```ts
// src/modules/users/users.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaService } from '@/database/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (existing) throw new ConflictException('Email already in use')

    const hashedPassword = await bcrypt.hash(dto.password, 12)
    return this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
      select: { id: true, email: true, firstName: true, createdAt: true },  // Never return password
    })
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOneOrThrow(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException(`User ${id} not found`)
    return user
  }

  async update(id: string, dto: UpdateUserDto, requestingUser: TJwtPayload) {
    await this.findOneOrThrow(id)
    return this.prisma.user.update({ where: { id }, data: dto })
  }

  async remove(id: string) {
    await this.findOneOrThrow(id)
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },   // Soft delete
    })
  }
}
```

---

## DTOs & Validation

Use `class-validator` on all DTOs. Enable strict global validation in `main.ts`.

```ts
// src/modules/users/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string

  @IsString()
  @MinLength(8)
  password: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsEnum(['admin', 'user', 'viewer'])
  @IsOptional()
  role?: string = 'user'
}
```

```ts
// src/main.ts - register global validation pipe
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,                // Strip undeclared properties
    forbidNonWhitelisted: true,     // Throw if undeclared properties sent
    transform: true,                // Auto-transform to DTO class instances
    transformOptions: { enableImplicitConversion: true },
  }))

  await app.listen(3000)
}
```

---

## Authentication (JWT + Passport)

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install --save-dev @types/passport-jwt @types/bcrypt
```

```ts
// src/modules/auth/auth.module.ts
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

```ts
// src/common/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    })
  }

  async validate(payload: TJwtPayload) {
    return payload   // Returned value is set as request.user
  }
}
```

```ts
// src/modules/auth/auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new UnauthorizedException('Invalid credentials')

    const payload: TJwtPayload = { sub: user.id, email: user.email, role: user.role }
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, role: user.role },
    }
  }
}
```

---

## Custom Decorators

Replace repetitive request access patterns with custom decorators.

```ts
// src/common/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): TJwtPayload => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)

// Usage in controller
@Get('profile')
getProfile(@CurrentUser() user: TJwtPayload) {
  return this.usersService.findOneOrThrow(user.sub)
}
```

---

## Global Exception Filter

```ts
// src/common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR

    const message = exception instanceof HttpException
      ? exception.message
      : 'Internal server error'

    if (status >= 500) {
      this.logger.error(exception)
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}

// Register globally in main.ts
app.useGlobalFilters(new AllExceptionsFilter())
```

---

## Security Setup

```ts
// src/main.ts - full security configuration
import * as helmet from 'helmet'
import { ThrottlerModule } from '@nestjs/throttler'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Security headers
  app.use(helmet())

  // CORS - explicitly list allowed origins
  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  })

  // Body size limit
  app.use(express.json({ limit: '1mb' }))

  // Global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(process.env.PORT ?? 3000)
}
```

```ts
// Rate limiting in app.module.ts
@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60_000,    // 1 minute window
      limit: 100,     // Max 100 requests per window
    }]),
  ],
})

// Apply throttle to specific routes
@UseGuards(ThrottlerGuard)
@Throttle({ default: { limit: 5, ttl: 60_000 } })  // 5 requests per minute on login
@Post('login')
login(@Body() dto: LoginDto) { ... }
```

---

## Interceptors for Logging & Serialization

```ts
// src/common/interceptors/logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest()
    const { method, url } = request
    const start = Date.now()

    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start
        this.logger.log(`${method} ${url} ${ms}ms`)
      })
    )
  }
}

// Register globally
app.useGlobalInterceptors(new LoggingInterceptor())
```

---

## IDOR Prevention

Every service method that reads or modifies a resource must verify ownership.

```ts
// ❌ Vulnerable - user can read any order by guessing the ID
async findOrder(orderId: string) {
  return this.prisma.order.findUnique({ where: { id: orderId } })
}

// ✅ Secure - user can only read their own orders
async findOrder(orderId: string, userId: string) {
  const order = await this.prisma.order.findFirst({
    where: { id: orderId, userId },   // Ownership check in the query
  })
  if (!order) throw new NotFoundException('Order not found')
  return order
}
```

---

## Unit Testing

```ts
// src/modules/users/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { PrismaService } from '@/database/prisma.service'

describe('UsersService', () => {
  let service: UsersService
  let prisma: PrismaService

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => jest.clearAllMocks())

  it('should throw ConflictException when email is taken', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: '1', email: 'test@example.com' })

    await expect(service.create({ email: 'test@example.com', password: '...', firstName: 'Jane', lastName: 'Doe' }))
      .rejects.toThrow(ConflictException)
  })
})
```

---

## ConfigService - Environment Variables

Never access `process.env` directly outside config files. Use `ConfigService` for type-safe, injectable configuration.

```ts
// src/config/app.config.ts
import { registerAs } from '@nestjs/config'

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
  frontendUrl: process.env.FRONTEND_URL!,
}))

export const dbConfig = registerAs('db', () => ({
  url: process.env.DATABASE_URL!,
  poolSize: parseInt(process.env.DB_POOL_SIZE ?? '10', 10),
}))
```

```ts
// app.module.ts
import { ConfigModule } from '@nestjs/config'
import { appConfig, dbConfig } from './config/app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
  ],
})
export class AppModule {}
```

```ts
// Usage in any service
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(private readonly config: ConfigService) {}

  getJwtSecret(): string {
    return this.config.getOrThrow<string>('app.jwtSecret')   // Throws if missing
  }
}
```

---

## Custom Pipes

Use custom `PipeTransform` classes when the built-in pipes don't cover your transformation needs.

```ts
// src/common/pipes/parse-sort.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

type TSortOrder = 'asc' | 'desc'

export interface TParsedSort {
  field: string
  order: TSortOrder
}

@Injectable()
export class ParseSortPipe implements PipeTransform<string, TParsedSort> {
  private readonly allowedFields: string[]

  constructor(allowedFields: string[]) {
    this.allowedFields = allowedFields
  }

  transform(value: string): TParsedSort {
    if (!value) return { field: 'createdAt', order: 'desc' }

    const [field, order = 'asc'] = value.split(':')

    if (!this.allowedFields.includes(field)) {
      throw new BadRequestException(`Sort field '${field}' is not allowed. Allowed: ${this.allowedFields.join(', ')}`)
    }

    if (order !== 'asc' && order !== 'desc') {
      throw new BadRequestException('Sort order must be asc or desc')
    }

    return { field, order: order as TSortOrder }
  }
}

// Usage in controller
@Get()
findAll(
  @Query('sort', new ParseSortPipe(['name', 'createdAt', 'email'])) sort: TParsedSort,
) {
  return this.usersService.findAll({ sort })
}
```

---

## Swagger API Documentation

Auto-generate interactive API docs from your decorators.

```bash
npm install @nestjs/swagger
```

```ts
// src/main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document)
    // Docs available at: http://localhost:3000/api/docs
  }

  await app.listen(3000)
}
```

```ts
// Decorate your DTOs and controllers
import { ApiProperty, ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'Password123!', minLength: 8 })
  @MinLength(8)
  password: string
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  create(@Body() dto: CreateUserDto) { ... }
}
```

---

## Event Emitter - Domain Events

Decouple side effects (emails, notifications, audit logs) from business logic using the built-in event emitter.

```bash
npm install @nestjs/event-emitter
```

```ts
// app.module.ts
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
  ],
})
export class AppModule {}
```

```ts
// src/modules/users/events/user-created.event.ts
export class UserCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
  ) {}
}

// users.service.ts - emit the event
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: { ... } })
    this.eventEmitter.emit('user.created', new UserCreatedEvent(user.id, user.email))
    return user
  }
}

// src/modules/notifications/listeners/user-created.listener.ts - side effect
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class UserCreatedListener {
  @OnEvent('user.created', { async: true })
  async handleUserCreated(event: UserCreatedEvent) {
    await this.emailService.sendWelcomeEmail(event.email)
    await this.analyticsService.track('user_signup', { userId: event.userId })
  }
}
```

---

## Quick Reference Checklist

- [ ] Business logic is in services, not controllers
- [ ] DTOs use `class-validator` decorators
- [ ] Global `ValidationPipe` configured with `whitelist: true`
- [ ] `helmet()` and explicit CORS configured in `main.ts`
- [ ] Rate limiting applied to auth endpoints
- [ ] JWT strategy registered and applied globally
- [ ] Global exception filter returns RFC 7807-style error format
- [ ] IDOR: ownership verified in every `findOne`/`update`/`delete`
- [ ] Never return `password` field from any endpoint
- [ ] Logging interceptor registered globally
