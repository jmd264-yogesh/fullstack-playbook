export interface FrameworkFolder {
  id: string;
  name: string;
  icon: string;
  description: string;
  architecture: string;
  folderStructure: string;
  libraries?: string[];
}

export const frontendFrameworks: FrameworkFolder[] = [
  {
    id: "react",
    name: "React",
    icon: "/icons/react.svg",
    description: "React Single Page Application using React Router.",
    architecture: "Feature-Based",
    folderStructure: `project-root/
├── src/
│   ├── routes/
│   │   ├── index.tsx
│   │   ├── AppRoutes.tsx
│   │   └── customer.tsx
│   ├── common/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── utils/
│   └── context.customer/
│       ├── _components/
│       ├── _domain/
│       ├── _hooks/
│       └── data/
├── public/
└── index.html`,
    libraries: [
      "React Router",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod"
    ]
  },

  {
    id: "nextjs",
    name: "Next.js",
    icon: "/icons/next.svg",
    description: "Next.js App Router with Server Components.",
    architecture: "Feature-Based + App Router",
    folderStructure: `project-root/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── (dashboard)/
│   ├── common/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── util/
│   │   ├── store/
│   │   ├── data/
│   │   └── types/
│   └── context.customer/
│       ├── _components/
│       ├── _domain/
│       ├── _hooks/
│       ├── _utils/
│       ├── data/
│       └── __tests__/
├── e2e/
├── public/
└── scripts/`,
    libraries: [
      "Auth.js",
      "Prisma",
      "TanStack Query",
      "Zustand",
      "Zod"
    ]
  },

  {
    id: "vite",
    name: "Vite",
    icon: "/icons/vite.svg",
    description: "Vite + React modular SPA.",
    architecture: "Feature-Based",
    folderStructure: `project-root/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── common/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── lib/
│   │   └── utils/
│   └── context.customer/
│       ├── _components/
│       ├── _domain/
│       ├── _hooks/
│       └── data/
├── public/
├── index.html
└── vite.config.ts`,
    libraries: [
      "React Router",
      "TanStack Query",
      "Zustand",
      "React Hook Form"
    ]
  },

  {
    id: "angular",
    name: "Angular",
    icon: "/icons/angular.svg",
    description: "Angular enterprise application architecture.",
    architecture: "Module-Based",
    folderStructure: `project-root/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── shared/
│   │   ├── features/
│   │   ├── layouts/
│   │   └── app.routes.ts
│   ├── assets/
│   ├── environments/
│   └── styles/
├── angular.json
└── package.json`,
    libraries: [
      "Angular Router",
      "RxJS",
      "NgRx",
      "Angular Material"
    ]
  },

  {
    id: "vue",
    name: "Vue",
    icon: "/icons/vue.svg",
    description: "Vue.js application architecture.",
    architecture: "Feature-Based",
    folderStructure: `project-root/
├── src/
│   ├── router/
│   ├── components/
│   ├── composables/
│   ├── stores/
│   ├── views/
│   ├── services/
│   └── assets/
├── public/
└── vite.config.ts`,
    libraries: [
      "Vue Router",
      "Pinia",
      "VueUse"
    ]
  },

  {
    id: "nuxt",
    name: "Nuxt",
    icon: "/icons/nuxt.svg",
    description: "Nuxt full-stack Vue framework.",
    architecture: "File-Based Routing",
    folderStructure: `project-root/
├── app.vue
├── pages/
├── components/
├── composables/
├── layouts/
├── middleware/
├── plugins/
├── server/
├── public/
└── nuxt.config.ts`,
    libraries: [
      "Pinia",
      "@nuxt/content",
      "@nuxt/image"
    ]
  },

  {
    id: "nestjs",
    name: "NestJS",
    icon: "/icons/nest.svg",
    description: "Enterprise Node.js backend framework.",
    architecture: "Module-Based",
    folderStructure: `project-root/
├── src/
│   ├── modules/
│   ├── common/
│   ├── config/
│   ├── database/
│   ├── main.ts
│   └── app.module.ts
├── test/
└── nest-cli.json`,
    libraries: [
      "Prisma",
      "TypeORM",
      "Passport",
      "Swagger"
    ]
  },

  {
    id: "laravel",
    name: "Laravel",
    icon: "/icons/laravel.svg",
    description: "PHP MVC framework.",
    architecture: "MVC",
    folderStructure: `project-root/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── tests/
└── artisan`,
    libraries: [
      "Eloquent",
      "Sanctum",
      "Pest",
      "Queues"
    ]
  }
];