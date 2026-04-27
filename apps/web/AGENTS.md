# AGENTS.md - Web Application (Next.js 14)

> **Last Updated**: 2025-02-27  
> **Framework**: Next.js 14 (App Router)  
> **Styling**: TailwindCSS + Chakra UI components  
> **Features**: i18n, SEO, Product catalog, User authentication  
> **Node Version**: >=20.x

---

## 🏗️ Architecture Overview

The web application is a large Next.js 14 website with hundreds of components and pages, using the App Router pattern.

```
apps/web/
├── src/
│   ├── pages/                  # Pages directory (not using AppRouter)
│   │   ├── index.tsx          # Homepage
│   │   ├── products/          # Product pages
│   │   │   ├── [slug].tsx     # Dynamic product detail
│   │   │   ├── accessories/
│   │   │   ├── carton/
│   │   │   ├── standard/
│   │   │   └── ...
│   │   ├── user/              # User authentication & profile
│   │   ├── sitemap/
│   │   └── ...
│   ├── components/            # React components
│   │   ├── common/            # Shared components (Header, Footer, Navbar)
│   │   ├── ui/                # UI component library
│   │   ├── components/        # Feature-specific components
│   │   ├── module/            # Feature modules
│   │   └── containers/        # Container components
│   ├── services/              # API calls & services
│   ├── utils/                 # Utility functions
│   ├── types/                 # TypeScript types
│   ├── hooks/                 # Custom React hooks
│   ├── contexts/              # React contexts
│   ├── config/                # Configuration files
│   └── styles/                # Global styles
├── next.config.js             # Next.js configuration
├── package.json
└── tsconfig.json
```

---

## 🔑 Core Concepts

### 1. Pages Router (Not App Router)

This app uses the **Pages Router** pattern (not App Router):

- Routes defined in `src/pages/` directory
- File-system based routing
- Each file becomes a route

### 2. Component Organization

Components are organized by **type/feature domain**:

```
components/
├── common/              # Cross-page shared components
│   ├── Navbar/          # Navigation bar
│   ├── Footer/          # Site footer
│   ├── Header/          # Page header
│   └── GlobalNav/       # Global navigation
├── ui/                  # Design system components
│   └── (50+ components like Button, Dialog, Input, etc.)
├── components/          # Reusable components
│   ├── ProjectCard
│   ├── post-body
│   └── ...
├── module/              # Feature modules
│   └── Pricing, ProductDemoList, etc.
└── containers/          # Container components
    └── Index, LoginForm, etc.
```

### 3. Internationalization (i18n)

**Used**: `next-i18next`

Configuration files:

```
next-i18next.config.js     # i18n configuration
i18next-parser.config.js    # Parser for translations
```

**Language Files**: Located in `public/locales/` (likely)

- Supports multiple languages
- Namespace-based translations

### 4. SEO Optimization

**Files for SEO**:

```
src/components/common/Seo/index.tsx
src/components/common/Head/index.tsx
src/config/seo.ts
```

**Features**:

- Dynamic meta tags
- Sitemap generation
- OpenGraph tags
- Canonical URLs

### 5. Styling Architecture

**Primary**: TailwindCSS
**Components**: Mix of:

- Tailwind utility classes
- Chakra UI components (imported from `@tongdelove/ui`)
- Custom CSS modules (`.module.css` files)
- Less files (`src/styles/variables.less`)

---

## 📁 Directory Details

### `/src/pages/` - Routes

| Directory/Files         | Routes                  | Purpose                   |
| ----------------------- | ----------------------- | ------------------------- |
| `index.tsx`             | `/`                     | Homepage                  |
| `products/`             | `/products/*`           | Product catalog & details |
| `products/[slug].tsx`   | `/products/:slug`       | Dynamic product page      |
| `products/accessories/` | `/products/accessories` | Accessories category      |
| `products/carton/`      | `/products/carton`      | Carton boxes              |
| `user/`                 | `/user/*`               | User auth & profile       |
| `user/login/`           | `/user/login`           | Login page                |
| `user/register/`        | `/user/register`        | Registration              |
| `about/`                | `/about`                | About page                |
| `contact/`              | `/contact`              | Contact page              |

**Page Structure Pattern**:

```typescript
// src/pages/about.tsx
export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>About Us</title>
      </Head>
      <MainContent />
    </Layout>
  )
}
```

### `/src/components/common/` - Shared Components

**Key Components**:

- `Navbar/` - Site navigation with responsive design
- `Footer/` - Site footer with links
- `Header/` - Page headers
- `GlobalNav/` - Global navigation menu
- `TopMenu/` - Top menu with dropdown
- `Layout/` - Page layout wrapper
- `Seo/` - SEO meta tags
- `Head/` - HTML head management
- `Lang/` - Language switcher

### `/src/components/ui/` - UI Components

**50+ UI Components** including:

- `Button` - various button styles and states
- `Dialog` - modal dialogs
- `Input` - form inputs
- `Checkbox` - checkbox inputs
- `Radio` - radio buttons
- `Select` - select dropdowns
- `Tooltip` - tooltips
- `Popover` - popover menus
- `Drawer` - slide-out panels
- `LoadingIndicator` - loading states
- And many more...

**Pattern**: Each component has:

- Module file (`.module.css`)
- Main component file
- Export in `index.tsx`
- Storybook stories (`.stories.tsx`)

### `/src/containers/` - Container Components

Containers connect data to presentation:

- `Index/` - Homepage container
- `Login`/`LoginForm/` - Login form containers
- `product/` - Product-related containers
- `introduce/` - Introduction pages
- `Daohang`/`DaohangCard`/`DaohangLink` - Navigation containers

---

## 🎯 Key Patterns & Conventions

### 1. Page Layout Pattern

**Wrapper Component**:

```typescript
// src/components/common/Layout/Layout.tsx
export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
```

**Page Usage**:

```typescript
export default function AboutPage() {
  return (
    <Layout>
      <AboutContent />
    </Layout>
  )
}
```

### 2. Component Prop Patterns

**Prop Interface**:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant, size, children, onClick }: ButtonProps) {
  return <button className={`btn btn-${variant}`}>{children}</button>
}
```

### 3. API Service Pattern

**Service Files** (`/src/services/`):

```typescript
// src/services/Post.service.ts
import axios from '@/utils/axios'

export async function getPosts() {
  const { data } = await axios.get('/api/posts')
  return data
}

export async function getPost(id: string) {
  const { data } = await axios.get(`/api/posts/${id}`)
  return data
}
```

### 4. Custom Hooks

**Hook Files** (`/src/hooks/`):

```typescript
// src/hooks/useDomClean.ts
import { useEffect } from 'react'

export function useDomClean() {
  useEffect(() => {
    // Cleanup logic
    return () => {
      // Cleanup on unmount
    }
  }, [])
}
```

### 5. Configuration Pattern

**Site Configuration** (`/src/config/`):

```typescript
// src/config/site.ts
export const siteConfig = {
  name: 'Packaging Solutions',
  url: 'https://packaging.example.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/packaging',
    github: 'https://github.com/packaging',
  },
}
```

---

## 🔧 Development Workflow

### Running the App

```bash
# Development mode
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type check
pnpm typecheck
```

### Adding a New Page

1. **Create file** in `src/pages/`:

   ```bash
   touch src/pages/my-page.tsx
   ```

2. **Implement page**:

   ```typescript
   export default function MyPage() {
     return <Layout><MyContent /></Layout>
   }
   ```

3. **Route** will be `/my-page`

### Adding a New Component

1. **Create component** in appropriate directory:
   - UI component: `src/components/ui/my-component.tsx`
   - Common component: `src/components/common/MyComponent/`

2. **Add styles** (if needed):

   ```css
   /* MyComponent.module.css */
   .container { ... }
   ```

3. **Export** from index:
   ```typescript
   export { MyComponent } from './MyComponent'
   ```

---

## 🚫 Anti-Patterns to Avoid

1. **Hardcoded URLs**
   - ❌ `<a href="/products/box">`
   - ✅ `<Link href="/products/box">` or use config

2. **Missing SEO tags**
   - ❌ Pages without meta tags
   - ✅ Use `<Seo />` or `<Head />` components

3. **Direct style manipulation**
   - ❌ `style={{ width: '100px' }}`
   - ✅ Use Tailwind classes: `className="w-[100px]"`

4. **Large component files**
   - ❌ 500+ line single file
   - ✅ Split into smaller features

5. **Skipping translation**
   - ❌ Hardcoded text
   - ✅ Use `useTranslation` hook

---

## 🔍 Common Issues & Solutions

| Issue                | Solution                                  |
| -------------------- | ----------------------------------------- |
| i18n not working     | Check `next-i18next` configuration        |
| Tailwind not purging | Use `@apply` or dynamic classes correctly |
| Build timeout        | Check for large images/assets             |
| SEO tags not showing | Ensure `Head` component is used correctly |

---

## 📊 Key Files & Sizes

| Directory/File               | Approx. Files | Purpose             |
| ---------------------------- | ------------- | ------------------- |
| `src/pages/`                 | 50+           | Page routes         |
| `src/components/common/`     | 30+           | Shared components   |
| `src/components/ui/`         | 50+           | UI components       |
| `src/components/components/` | 20+           | Reusable components |
| `src/services/`              | 5+            | API services        |
| `src/hooks/`                 | 5+            | Custom hooks        |

---

## 🤝 Contributing

When working on the web app:

1. Use Pages Router (not App Router)
2. Components in appropriate directories
3. Use TailwindCSS for styling
4. Include i18n for user-facing text
5. Add SEO meta tags to pages
6. Use Chakra components from `@tongdelove/ui`
7. Test responsive design
8. Follow component prop patterns

---

_For Next.js patterns, see [Next.js Documentation](https://nextjs.org/docs)_
_For TailwindCSS, see [TailwindCSS Documentation](https://tailwindcss.com/docs)_
