# AGENTS.md - Server (NestJS API)

> **Last Updated**: 2025-02-27  
> **Framework**: NestJS (TypeScript)  
> **Database**: PostgreSQL + Prisma ORM  
> **API Styles**: REST + GraphQL  
> **Architecture**: Modular (Feature-based Modules)

---

## 🏗️ Architecture Overview

The server is a NestJS application serving as the central backend API for the monorepo.

```
services/server/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   ├── config/                    # Configuration providers
│   │   ├── database.module.ts     # Prisma connection
│   │   └── graphql.module.ts      # GraphQL server setup
│   ├── modules/                   # Feature modules
│   │   ├── auth/                  # Authentication & authorization
│   │   ├── users/                 # User management
│   │   ├── articles/              # Article/Content management
│   │   ├── books/                 # Book management
│   │   ├── comments/              # Comments system
│   │   ├── products/              # E-commerce products
│   │   └── ...                    # Other domain modules
│   ├── common/                    # Shared utilities
│   │   ├── guards/                # Route guards
│   │   ├── decorators/            # Custom decorators
│   │   ├── interceptors/          # Request/response interceptors
│   │   ├── filters/               # Exception filters
│   │   └── pipes/                 # Data transformation pipes
│   └── generated/                 # Auto-generated files
│       ├── prisma-pothos-types     # Prisma + Pothos types
│       └── ...
├── prisma/                        # Prisma schema & migrations
│   └── schema.prisma
├── test/                          # Test files
├── nest-cli.json                  # NestJS CLI config
└── package.json
```

---

## 🔑 Core Concepts

### 1. Modular Architecture

NestJS modules are organized by **domain/feature**:

```
Example Module Structure:
users/
├── users.module.ts          # Module definition
├── users.controller.ts      # HTTP routes (REST)
├── users.resolver.ts        # GraphQL resolvers
├── users.service.ts         # Business logic
├── entities/                # GraphQL entities
├── dto/                     # Data transfer objects
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
└── users.spec.ts            # Unit tests
```

**Module Dependencies**:

```typescript
@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### 2. Dual API Style (REST + GraphQL)

The server exposes **both** REST and GraphQL endpoints:

| Style       | Entry Point     | Use Case                                                |
| ----------- | --------------- | ------------------------------------------------------- |
| **REST**    | `@Controller()` | CRUD operations, file uploads, webhooks                 |
| **GraphQL** | `@Resolver()`   | Complex queries, data fetching, real-time subscriptions |

**Example**:

```typescript
// REST
@Post('users')
async createUser(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}

// GraphQL
@Mutation(() => User)
async createUser(@Args('input') input: CreateUserDto) {
  return this.usersService.create(input);
}
```

### 3. Prisma Integration

**Database Module**: `src/config/database.module.ts`

```typescript
@Module({
  providers: [
    {
      provide: PrismaService,
      useFactory: () => new PrismaClient(),
    },
  ],
  exports: [PrismaService],
})
export class DatabaseModule {}
```

**Usage in Services**:

```typescript
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany()
  }
}
```

### 4. Authentication & Authorization

**Guards** (`src/common/guards/`):

- `AuthGuard` - JWT token verification
- `RolesGuard` - Role-based access control
- `PermissionsGuard` - Fine-grained permissions

**Decorators** (`src/common/decorators/`):

- `@Public()` - Allow public access (bypass auth)
- `@Roles()` - Required roles
- `@CurrentUser()` - Inject current user

**Usage**:

```typescript
@UseGuards(AuthGuard)
@Get('profile')
async getProfile(@CurrentUser() user: User) {
  return user;
}

@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
@Post('admin-action')
async adminAction() {
  // Only admins can access
}
```

### 5. Type Safety with Prisma + Zod

**Generated Types**:

```typescript
// prisma/generated/prisma-pothos-types
import * as types from '../generated/prisma-pothos-types'
```

**Validation**:

- DTOs use class-validator decorators
- Zod schemas can be generated from Prisma via `zod-prisma`
- Type inference from Prisma models

---

## 📁 Module Patterns

### Standard Module File List

| File                     | Purpose                            | Required    |
| ------------------------ | ---------------------------------- | ----------- |
| `{module}.module.ts`     | Module definition, imports/exports | ✅ Yes      |
| `{module}.controller.ts` | REST routes                        | ✅ Yes      |
| `{module}.resolver.ts`   | GraphQL operations                 | ✅ Yes      |
| `{module}.service.ts`    | Business logic                     | ✅ Yes      |
| `entities/`              | GraphQL entities                   | Optional    |
| `dto/`                   | Validation schemas                 | Optional    |
| `{module}.spec.ts`       | Tests                              | Recommended |

### Controller Pattern (REST)

```typescript
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  findAll(): Promise<Article[]> {
    return this.articlesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id)
  }

  @Post()
  create(@Body() dto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(dto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articlesService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id)
  }
}
```

### Resolver Pattern (GraphQL)

```typescript
@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private articlesService: ArticlesService) {}

  @Query(() => [Article])
  articles(): Promise<Article[]> {
    return this.articlesService.findAll()
  }

  @Mutation(() => Article)
  createArticle(@Args('input') input: CreateArticleInput): Promise<Article> {
    return this.articlesService.create(input)
  }

  @ResolveField(() => Author)
  author(@Parent() article: Article) {
    return this.articlesService.getAuthor(article.authorId)
  }
}
```

### Service Pattern

```typescript
@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Article[]> {
    return this.prisma.article.findMany({
      include: { author: true, tags: true },
    })
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: { id },
    })
    if (!article) {
      throw new NotFoundException('Article not found')
    }
    return article
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.prisma.article.create({
      data: createArticleDto,
    })
  }
}
```

---

## 🎯 Working Conventions

### 1. Error Handling

**Custom Exceptions**:

```typescript
export class UserNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`User with ID ${id} not found`)
  }
}
```

**Exception Filters**:

```typescript
import { Catch, ExceptionFilter } from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Standardized error response format
  }
}
```

### 2. DTO Validation with class-validator

```typescript
import { IsString, IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string
}
```

### 3. Interceptors for Cross-Cutting Concerns

**Logging Interceptor**:

```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)))
  }
}
```

### 4. Testing Patterns

**Unit Tests** (`.spec.ts`):

```typescript
describe('UsersService', () => {
  let service: UsersService
  let prisma: PrismaService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should create a user', async () => {
    expect(service.create(dto)).resolves.toEqual(expectedUser)
  })
})
```

---

## 🔧 Development Workflow

### Running the Server

```bash
# Development mode (with hot reload)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start:prod

# Run tests
pnpm test

# Run e2e tests
pnpm test:e2e
```

### Adding a New Module

```bash
# Generate using NestJS CLI
nest g module modules/my-feature
nest g controller modules/my-feature
nest g service modules/my-feature
nest g resolver modules/my-feature

# Or create manually following the pattern
```

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --create-only

# Apply migration
npx prisma migrate dev

# Reset database (dev only)
npx prisma migrate reset

# Open Prisma Studio
pnpm db:studio
```

---

## 🚫 Anti-Patterns to Avoid

1. **Direct database access in controllers**
   - ❌ Use Prisma directly in controller
   - ✅ Always go through service layer

2. **Skipping validation**
   - ❌ Use `@Body() data: any`
   - ✅ Use DTOs with class-validator

3. **Missing error handling**
   - ❌ Throw raw exceptions
   - ✅ Use custom exceptions or filters

4. **Circular dependencies**
   - ❌ Module A imports Module B, B imports A
   - ✅ Use forward reference or extract common logic

5. **Hardcoded configuration**
   - ❌ `const API_KEY = 'hardcoded'`
   - ✅ Use `@Injectable()` with ConfigService

---

## 🔍 Common Issues & Solutions

| Issue                 | Solution                                       |
| --------------------- | ---------------------------------------------- |
| Prisma client errors  | Run `pnpm db:generate` after schema changes    |
| CORS errors           | Enable CORS in main.ts                         |
| GraphQL schema errors | Check resolver return types match Prisma types |
| Slow queries          | Add database indexes via Prisma migrations     |

---

## 📊 Key Configuration Files

| File                  | Purpose                    |
| --------------------- | -------------------------- |
| `nest-cli.json`       | NestJS CLI configuration   |
| `.graphqlconfig`      | GraphQL compiler settings  |
| `tsconfig.build.json` | TypeScript build config    |
| `graphql.schema.ts`   | Generated GraphQL schema   |
| `ecosystem.config.js` | PM2 process manager config |

---

## 🤝 Contributing

When working on the server:

1. Understand the module structure (feature-based)
2. Services contain business logic
3. Controllers are thin (route to service)
4. Use DTOs for input validation
5. Use guards for authentication/authorization
6. Write unit tests for services
7. Use Prisma for all database operations

---

_For NestJS best practices, see [NestJS Documentation](https://docs.nestjs.com)_
_For Prisma patterns, see [Prisma Documentation](https://www.prisma.io/docs)_
