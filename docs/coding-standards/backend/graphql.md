# GraphQL Best Practices & Standards

<Callout type="important">
Design the schema around product concepts and client tasks, not database tables. GraphQL types are a public contract; version changes deliberately and avoid exposing ORM entities or sensitive fields.
</Callout>

GraphQL is used for complex APIs where clients need flexible data fetching. We use a **Code-First** approach with NestJS and TypeGraphQL decorators - no manual `.graphql` schema files.

---

## Overview

Use GraphQL when clients benefit from flexible, typed queries over a stable product API. Protect that flexibility with schema design, authentication, pagination, request context, and query-cost limits.

---

## Quick Start

### npm
```bash
npm install @nestjs/graphql @nestjs/apollo @apollo/server graphql
npm install dataloader
npm install graphql-query-complexity
```
---
### pnpm
```bash
pnpm add @nestjs/graphql @nestjs/apollo @apollo/server graphql 
pnpm add dataloader 
pnpm add graphql-query-complexity
```
---
### bun
```bash
bun add @nestjs/graphql @nestjs/apollo @apollo/server graphql 
bun add dataloader 
bun add graphql-query-complexity
```
---
### yarn
```bash
yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql 
yarn add dataloader 
yarn add graphql-query-complexity
```
---

## Setup in NestJS

```ts
// src/app.module.ts
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),  // Auto-generated from code
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',      // Disable in production
      introspection: process.env.NODE_ENV !== 'production',   // Disable in production
      context: ({ req }) => ({ req }),                        // Pass request to context
    }),
  ],
})
export class AppModule {}
```

---

## Code-First: Types, Resolvers, Inputs

### Object Types (Response shapes)

```ts
// src/modules/users/models/user.model.ts
import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  role: string

  @Field()
  createdAt: Date

  // ❌ Never expose sensitive fields like password
  // password is not annotated with @Field() - it won't appear in the schema
}
```

### Input Types (Mutation arguments)

```ts
// src/modules/users/dto/create-user.input.ts
import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsString, MinLength } from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  @MinLength(8)
  password: string

  @Field()
  @IsString()
  firstName: string

  @Field()
  @IsString()
  lastName: string
}
```

### Resolvers

```ts
// src/modules/users/users.resolver.ts
import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { User } from './models/user.model'
import { Order } from '../orders/models/order.model'
import { UsersService } from './users.service'
import { CreateUserInput } from './dto/create-user.input'
import { GqlAuthGuard } from '@/common/guards/gql-auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { OrdersLoader } from '@/modules/orders/loaders/orders.loader'

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly ordersLoader: OrdersLoader,
  ) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.usersService.findAll()
  }

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOneOrThrow(id)
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput)
  }

  // Field resolver - uses DataLoader to batch orders for all users
  @ResolveField(() => [Order])
  async orders(@Parent() user: User) {
    return this.ordersLoader.load(user.id)   // Batched - not N+1
  }
}
```

---

## DataLoader - Mandatory for Relations

Every field resolver that fetches related data must use DataLoader to batch requests and prevent N+1.

```ts
// src/modules/orders/loaders/orders.loader.ts
import { Injectable, Scope } from '@nestjs/common'
import DataLoader from 'dataloader'
import { PrismaService } from '@/database/prisma.service'

@Injectable({ scope: Scope.REQUEST })   // New loader instance per request
export class OrdersLoader {
  private loader: DataLoader<string, Order[]>

  constructor(private readonly prisma: PrismaService) {
    this.loader = new DataLoader<string, Order[]>(
      async (userIds) => {
        const orders = await this.prisma.order.findMany({
          where: { userId: { in: [...userIds] } },
        })

        // Group orders by userId to match DataLoader's key order
        return userIds.map(
          (userId) => orders.filter((o) => o.userId === userId)
        )
      },
      { cache: true }
    )
  }

  load(userId: string): Promise<Order[]> {
    return this.loader.load(userId)
  }
}
```

```ts
// Register in users.module.ts
@Module({
  providers: [UsersResolver, UsersService, OrdersLoader],
})
export class UsersModule {}
```

---

## Authentication in GraphQL

### JWT Guard for GraphQL Context

```ts
// src/common/guards/gql-auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req   // Extract req from GraphQL context
  }
}
```

```ts
// src/common/decorators/current-user.decorator.ts - updated for GraphQL
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req.user
  }
)

// Usage
@Query(() => User)
@UseGuards(GqlAuthGuard)
me(@CurrentUser() user: TJwtPayload) {
  return this.usersService.findOneOrThrow(user.sub)
}
```

---

## Query Complexity & Depth Limiting

Without limits, a malicious query can deeply nest relations and crash the database.

```ts
// src/app.module.ts - add complexity plugin
import { GraphQLModule } from '@nestjs/graphql'
import { createComplexityPlugin } from 'graphql-query-complexity'

GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: true,
  plugins: [
    createComplexityPlugin({
      estimators: [
        fieldExtensionsEstimator(),
        simpleEstimator({ defaultComplexity: 1 }),
      ],
      maximumComplexity: 100,   // Reject queries scoring over 100
      onComplete: (complexity) => {
        console.log('Query complexity:', complexity)
      },
    }),
  ],
})
```

```ts
// Add per-field complexity on expensive resolvers
@ResolveField(() => [Order], { complexity: 10 })  // Each orders field costs 10 points
async orders(@Parent() user: User) {
  return this.ordersLoader.load(user.id)
}
```

---

## Pagination (Relay Cursor Style)

Never use offset pagination for large datasets. Use cursor-based pagination.

```ts
// src/common/pagination/page-info.model.ts
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class PageInfo {
  @Field() hasNextPage: boolean
  @Field() hasPreviousPage: boolean
  @Field({ nullable: true }) startCursor?: string
  @Field({ nullable: true }) endCursor?: string
}

@ObjectType()
export class UserEdge {
  @Field(() => User) node: User
  @Field() cursor: string
}

@ObjectType()
export class UserConnection {
  @Field(() => [UserEdge]) edges: UserEdge[]
  @Field(() => PageInfo) pageInfo: PageInfo
  @Field() totalCount: number
}
```

```ts
// Resolver with cursor pagination
@Query(() => UserConnection)
async users(
  @Args('first', { type: () => Int, defaultValue: 20 }) first: number,
  @Args('after', { nullable: true }) after?: string,
) {
  const cursor = after ? { id: decodeCursor(after) } : undefined

  const users = await this.prisma.user.findMany({
    take: first + 1,       // Fetch one extra to determine hasNextPage
    cursor,
    skip: cursor ? 1 : 0,  // Skip the cursor item itself
    orderBy: { id: 'asc' },
  })

  const hasNextPage = users.length > first
  const nodes = hasNextPage ? users.slice(0, -1) : users

  return {
    edges: nodes.map((user) => ({ node: user, cursor: encodeCursor(user.id) })),
    pageInfo: {
      hasNextPage,
      hasPreviousPage: !!after,
      startCursor: nodes[0] ? encodeCursor(nodes[0].id) : null,
      endCursor: nodes.at(-1) ? encodeCursor(nodes.at(-1)!.id) : null,
    },
    totalCount: await this.prisma.user.count(),
  }
}
```

---

## Custom Scalars

Replace `String` with strict scalars for emails, UUIDs, and dates.

```ts
// src/common/scalars/date.scalar.ts
import { Scalar, CustomScalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'

@Scalar('DateTime', () => Date)
export class DateTimeScalar implements CustomScalar<string, Date> {
  description = 'ISO 8601 DateTime'

  parseValue(value: string): Date {
    return new Date(value)
  }

  serialize(value: Date): string {
    return value.toISOString()
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) return new Date(ast.value)
    throw new Error('DateTime must be a string')
  }
}
```

---

## Error Handling

Never leak internal errors. Map exceptions to clean GraphQL errors.

```ts
// src/common/plugins/error-format.plugin.ts
import { Plugin } from '@nestjs/apollo'
import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server'

@Plugin()
export class ErrorFormatPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    return {
      async willSendResponse({ response }) {
        response.body.kind === 'single' &&
          response.body.singleResult.errors?.forEach((err) => {
            // Strip stack traces and internal messages in production
            if (process.env.NODE_ENV === 'production') {
              delete err.extensions?.stacktrace
            }
          })
      },
    }
  }
}
```

---

## Enums

Define enums once in TypeScript and share them between the GraphQL schema and application logic.

```ts
// src/common/enums/user-role.enum.ts
import { registerEnumType } from '@nestjs/graphql'

export enum UserRole {
  ADMIN  = 'ADMIN',
  USER   = 'USER',
  VIEWER = 'VIEWER',
}

// Register with GraphQL - makes it available in the schema
registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'The role of a user within the system',
  valuesMap: {
    ADMIN:  { description: 'Full access' },
    USER:   { description: 'Standard access' },
    VIEWER: { description: 'Read-only access' },
  },
})
```

```ts
// Use in ObjectType and InputType
@ObjectType()
export class User {
  @Field(() => UserRole)
  role: UserRole
}

@InputType()
export class CreateUserInput {
  @Field(() => UserRole, { defaultValue: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRole
}

// Use in resolver
@Query(() => [User])
async usersByRole(@Args('role', { type: () => UserRole }) role: UserRole) {
  return this.usersService.findByRole(role)
}
```

---

## Union Types

Use unions when a query can return one of several different types - e.g., a search result that returns Users, Orders, or Products.

```ts
// src/modules/search/models/search-result.model.ts
import { createUnionType } from '@nestjs/graphql'
import { User } from '../users/models/user.model'
import { Order } from '../orders/models/order.model'
import { Product } from '../products/models/product.model'

export const SearchResult = createUnionType({
  name: 'SearchResult',
  types: () => [User, Order, Product] as const,
  resolveType(value) {
    if ('email' in value) return User
    if ('reference' in value) return Order
    if ('sku' in value) return Product
    return null
  },
})
```

```ts
// Resolver
@Query(() => [SearchResult])
async search(@Args('query') query: string): Promise<Array<typeof SearchResult>> {
  const [users, orders, products] = await Promise.all([
    this.usersService.search(query),
    this.ordersService.search(query),
    this.productsService.search(query),
  ])
  return [...users, ...orders, ...products]
}
```

```graphql
# Client query - use inline fragments to access type-specific fields
query Search($query: String!) {
  search(query: $query) {
    ... on User    { id email firstName }
    ... on Order   { id reference total }
    ... on Product { id name sku }
  }
}
```

---

## Subscriptions (Real-time)

Use subscriptions for real-time features: live order status, chat, notifications.

```bash
npm install graphql-subscriptions @graphql-tools/schema
```

```ts
// app.module.ts - enable subscriptions
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: true,
  subscriptions: {
    'graphql-ws': true,      // WebSocket transport (preferred)
    'subscriptions-transport-ws': false,
  },
})
```

```ts
// src/modules/orders/orders.resolver.ts
import { Resolver, Subscription, Mutation, Args, ID } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { Inject } from '@nestjs/common'

const ORDER_UPDATED = 'ORDER_UPDATED'

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => Order)
  async updateOrderStatus(
    @Args('id', { type: () => ID }) id: string,
    @Args('status') status: string,
  ) {
    const order = await this.ordersService.updateStatus(id, status)
    await this.pubSub.publish(ORDER_UPDATED, { orderUpdated: order })
    return order
  }

  @Subscription(() => Order, {
    filter: (payload, variables) =>
      payload.orderUpdated.id === variables.orderId,
  })
  orderUpdated(@Args('orderId', { type: () => ID }) orderId: string) {
    return this.pubSub.asyncIterator(ORDER_UPDATED)
  }
}
```

```ts
// Provide PubSub in module
@Module({
  providers: [
    OrdersResolver,
    OrdersService,
    { provide: 'PUB_SUB', useValue: new PubSub() },
  ],
})
export class OrdersModule {}
```

```graphql
# Client subscription
subscription OnOrderUpdated($orderId: ID!) {
  orderUpdated(orderId: $orderId) {
    id
    status
    updatedAt
  }
}
```

---

## Anti-Patterns

| Anti-Pattern | Problem | Correct Approach |
|---|---|---|
| Field resolver without DataLoader | N+1 queries - DB crashes under load | Always use DataLoader for related fields |
| Exposing DB entities as `@ObjectType()` | Schema couples to DB - breaks on rename | Maintain separate DTO/model classes |
| No complexity limits | Client sends deeply-nested query, crashes DB | Configure `graphql-query-complexity` |
| Leaking stack traces in errors | Security risk | Format errors plugin strips stacktrace in production |
| Schema-first approach | Manual type sync between `.graphql` and TypeScript | Use Code-First - schema auto-generated |
| `SELECT *` in resolvers | Fetches fields the client didn't request | Pass `info` to ORM to select only requested fields |

---

## Quick Reference Checklist

- [ ] `playground` and `introspection` disabled in production
- [ ] All field resolvers fetching relations use DataLoader
- [ ] Query complexity and depth limits configured
- [ ] `GqlAuthGuard` applied to all protected queries and mutations
- [ ] Input types use `class-validator` decorators
- [ ] Error format plugin strips stack traces in production
- [ ] Cursor-based pagination used for all list queries
- [ ] Sensitive fields (password, tokens) not annotated with `@Field()`
