export interface BackendFrameworkFolder {
  id: string;
  name: string;
  icon: string;
  description: string;
  architecture: string;
  folderStructure: string;
  libraries?: string[];
}

export const backendFrameworks: BackendFrameworkFolder[] = [
  {
    id: "express",
    name: "Express.js",
    icon: "/icons/express.svg",
    description:
      "Minimal and flexible Node.js framework commonly used for REST APIs and microservices.",
    architecture: "Feature-Based",
    folderStructure: `project-root/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── logger.ts
│   ├── common/
│   │   ├── middleware/
│   │   ├── errors/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── types/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.repository.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.validation.ts
│   │   │   └── __tests__/
│   │   └── users/
│   │       ├── user.controller.ts
│   │       ├── user.service.ts
│   │       ├── user.repository.ts
│   │       ├── user.routes.ts
│   │       ├── user.validation.ts
│   │       └── __tests__/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
│       └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── tsconfig.json
└── package.json`,
    libraries: [
      "Prisma",
      "Zod",
      "JWT",
      "Multer",
      "Nodemailer",
      "Winston",
      "Swagger",
      "bcrypt"
    ]
  },

  {
    id: "nestjs",
    name: "NestJS",
    icon: "/icons/nest.svg",
    description:
      "Enterprise-grade Node.js framework built with TypeScript and dependency injection.",
    architecture: "Module-Based",
    folderStructure: `project-root/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   └── __tests__/
│   │   └── users/
│   │       ├── users.module.ts
│   │       ├── users.controller.ts
│   │       ├── users.service.ts
│   │       ├── dto/
│   │       ├── entities/
│   │       └── __tests__/
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── middleware/
│   │   ├── pipes/
│   │   └── types/
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── auth.config.ts
│   │   └── database.config.ts
│   └── database/
│       ├── migrations/
│       └── seeders/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env.example
├── nest-cli.json
├── tsconfig.json
└── package.json`,
    libraries: [
      "Prisma",
      "TypeORM",
      "Passport",
      "JWT",
      "Class Validator",
      "Swagger",
      "BullMQ",
      "Cache Manager"
    ]
  },

  {
    id: "spring-boot",
    name: "Spring Boot",
    icon: "/icons/spring.svg",
    description:
      "Enterprise Java framework built on the Spring ecosystem for scalable and maintainable applications.",
    architecture: "Layered Architecture",
    folderStructure: `project-root/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/app/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── entity/
│   │   │       ├── dto/
│   │   │       ├── mapper/
│   │   │       ├── exception/
│   │   │       ├── security/
│   │   │       ├── util/
│   │   │       └── Application.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── static/
│   │       └── templates/
│   └── test/
│       └── java/
├── target/
├── pom.xml
└── README.md`,
    libraries: [
      "Spring Data JPA",
      "Spring Security",
      "Hibernate",
      "Flyway",
      "MapStruct",
      "Lombok",
      "Swagger (OpenAPI)",
      "JUnit 5"
    ]
  },

  {
    id: "aspnet-core",
    name: "ASP.NET Core",
    icon: "/icons/dotnet.svg",
    description:
      "Microsoft's modern framework for building high-performance web APIs and enterprise applications.",
    architecture: "Clean Architecture",
    folderStructure: `project-root/
├── src/
│   ├── Api/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   ├── Filters/
│   │   ├── Extensions/
│   │   └── Program.cs
│   ├── Application/
│   │   ├── DTOs/
│   │   ├── Interfaces/
│   │   ├── Services/
│   │   ├── Validators/
│   │   └── Features/
│   ├── Domain/
│   │   ├── Entities/
│   │   ├── Enums/
│   │   ├── Events/
│   │   └── Interfaces/
│   ├── Infrastructure/
│   │   ├── Persistence/
│   │   ├── Identity/
│   │   ├── Repositories/
│   │   └── Services/
│   └── Shared/
│       ├── Constants/
│       ├── Exceptions/
│       └── Utilities/
├── tests/
│   ├── UnitTests/
│   └── IntegrationTests/
├── appsettings.json
├── appsettings.Development.json
└── *.sln`,
    libraries: [
      "Entity Framework Core",
      "ASP.NET Identity",
      "AutoMapper",
      "FluentValidation",
      "MediatR",
      "Serilog",
      "Swagger",
      "xUnit"
    ]
  },
  {
    id: "laravel",
    name: "Laravel",
    icon: "/icons/laravel.svg",
    description:
      "Modern PHP framework following the MVC pattern with elegant syntax and a rich ecosystem.",
    architecture: "MVC",
    folderStructure: `project-root/
├── app/
│   ├── Actions/
│   ├── Console/
│   ├── Events/
│   ├── Exceptions/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   ├── Requests/
│   │   └── Resources/
│   ├── Jobs/
│   ├── Listeners/
│   ├── Mail/
│   ├── Models/
│   ├── Notifications/
│   ├── Policies/
│   ├── Providers/
│   └── Services/
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/
├── resources/
│   ├── views/
│   └── lang/
├── routes/
│   ├── api.php
│   ├── web.php
│   └── console.php
├── storage/
├── tests/
│   ├── Feature/
│   └── Unit/
├── .env.example
├── artisan
└── composer.json`,
    libraries: [
      "Eloquent ORM",
      "Sanctum",
      "Passport",
      "Pest",
      "Laravel Horizon",
      "Laravel Queues",
      "Laravel Scout",
      "Spatie Laravel Permission"
    ]
  },

  {
    id: "django",
    name: "Django",
    icon: "/icons/django.svg",
    description:
      "High-level Python web framework that encourages rapid development and clean, pragmatic design.",
    architecture: "MTV (Model-Template-View)",
    folderStructure: `project-root/
├── manage.py
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
├── apps/
│   ├── users/
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── services.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── tests.py
│   └── products/
├── common/
│   ├── middleware/
│   ├── permissions/
│   ├── pagination/
│   └── utils/
├── templates/
├── static/
├── media/
├── requirements.txt
└── README.md`,
    libraries: [
      "Django REST Framework",
      "Celery",
      "Redis",
      "django-filter",
      "drf-spectacular",
      "Simple JWT",
      "Pytest",
      "Whitenoise"
    ]
  },
    {
    id: "fastapi",
    name: "FastAPI",
    icon: "/icons/fastapi.svg",
    description:
      "Modern, high-performance Python framework for building APIs with automatic OpenAPI documentation and type safety.",
    architecture: "Feature-Based",
    folderStructure: `project-root/
├── app/
│   ├── main.py
│   ├── api/
│   │   ├── deps.py
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   └── products.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── logging.py
│   ├── db/
│   │   ├── base.py
│   │   ├── session.py
│   │   └── migrations/
│   ├── models/
│   ├── schemas/
│   ├── repositories/
│   ├── services/
│   ├── middleware/
│   ├── utils/
│   └── tests/
├── alembic/
├── requirements.txt
├── .env.example
└── README.md`,
    libraries: [
      "SQLAlchemy",
      "Alembic",
      "Pydantic",
      "FastAPI Users",
      "Celery",
      "Redis",
      "Pytest",
      "Uvicorn"
    ]
  },

  {
    id: "go",
    name: "Go (Gin)",
    icon: "/icons/go.svg",
    description:
      "High-performance Go web framework ideal for REST APIs, microservices, and cloud-native applications.",
    architecture: "Feature-Based",
    folderStructure: `project-root/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── config/
│   ├── handlers/
│   ├── middleware/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   └── utils/
├── pkg/
│   ├── logger/
│   └── response/
├── migrations/
├── scripts/
├── docs/
├── configs/
├── .env.example
├── go.mod
└── go.sum`,
    libraries: [
      "Gin",
      "GORM",
      "Viper",
      "JWT-Go",
      "Zap",
      "Swagger",
      "Validator",
      "Testify"
    ]
  }
];
