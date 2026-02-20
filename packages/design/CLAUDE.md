# Design共享包 - packages/design

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **design**

## 概述

**设计系统** - 基于Chakra UI和TailwindCSS的现代化设计系统和组件规范

## 技术栈

- **UI框架**: Chakra UI 3.1.2
- **样式**: Emotion React 11.13.3, Emotion Styled 11.10.8
- **图标**: Chakra Icons 2.0.13, React Icons 4.10.1
- **文档**: Storybook 7.4.6
- **构建**: Vite 4.4.10, tsup 7.2.0
- **测试**: Vitest, Testing Library
- **代码规范**: ESLint, Prettier

## 目录结构

```
packages/design/
├── src/
│   ├── components/             # 组件库
│   │   ├── Button/            # 按钮组件
│   │   │   ├── index.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Button.stories.tsx
│   │   ├── Input/             # 输入框
│   │   ├── Card/              # 卡片
│   │   ├── Modal/             # 模态框
│   │   └── ...
│   ├── theme/                 # 主题配置
│   │   ├── colors.ts          # 颜色系统
│   │   ├── fonts.ts           # 字体系统
│   │   ├── components.ts      # 组件主题
│   │   ├── index.ts           # 主题入口
│   │   └── extend.ts          # 扩展主题
│   ├── styles/                # 样式工具
│   │   ├── global.ts          # 全局样式
│   │   └── css.ts             # CSS工具
│   ├── utils/                 # 工具函数
│   │   ├── breakpoints.ts     # 断点工具
│   │   └── animations.ts      # 动画工具
│   ├── hooks/                 # 自定义Hooks
│   │   ├── useTheme.ts        # 主题Hook
│   │   └── useColorMode.ts    # 颜色模式Hook
│   ├── types/                 # TypeScript类型
│   │   ├── theme.ts           # 主题类型
│   │   └── component.ts       # 组件类型
│   └── index.ts               # 主入口
├── storybook-static/          # Storybook静态文件
├── build/                     # 构建输出
├── .storybook/                # Storybook配置
│   ├── main.ts
│   └── preview.ts
├── package.json
└── tsconfig.json
```

## 设计系统架构

### 1. 颜色系统 (theme/colors.ts)

```typescript
// 主色板
export const colors = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',  // 主色
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    500: '#10B981',
    600: '#059669',
    900: '#064E3B',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    900: '#78350F',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    900: '#7F1D1D',
  },
}

// 语义化颜色
export const semanticColors = {
  text: {
    primary: 'gray.900',
    secondary: 'gray.600',
    disabled: 'gray.400',
    inverse: 'white',
  },
  bg: {
    primary: 'white',
    secondary: 'gray.50',
    muted: 'gray.100',
    accent: 'primary.50',
  },
  border: {
    default: 'gray.200',
    emphasis: 'gray.300',
    muted: 'gray.100',
  },
}
```

### 2. 字体系统 (theme/fonts.ts)

```typescript
export const fonts = {
  heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  mono: `'Fira Code', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace`,
}

export const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  md: '1rem',       // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
}

export const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
}

export const lineHeights = {
  normal: 'normal',
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
  taller: 2,
}
```

### 3. 间距系统

```typescript
export const space = {
  px: '1px',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
  72: '18rem',       // 288px
  80: '20rem',       // 320px
  96: '24rem',       // 384px
}
```

### 4. 断点系统

```typescript
export const breakpoints = {
  base: '0em',      // 0px
  sm: '30em',       // 480px
  md: '48em',       // 768px
  lg: '62em',       // 992px
  xl: '80em',       // 1280px
  '2xl': '96em',    // 1536px
}

// 媒体查询工具
export const mediaQueries = {
  sm: `@media screen and (min-width: ${breakpoints.sm})`,
  md: `@media screen and (min-width: ${breakpoints.md})`,
  lg: `@media screen and (min-width: ${breakpoints.lg})`,
  xl: `@media screen and (min-width: ${breakpoints.xl})`,
  '2xl': `@media screen and (min-width: ${breakpoints['2xl']})`,
}
```

### 5. 阴影系统

```typescript
export const shadows = {
  xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
}
```

## 核心组件

### 1. Button 组件

```typescript
// src/components/Button/index.tsx
import React from 'react'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { cx } from '@/utils/cx'

interface CustomButtonProps extends ButtonProps {
  variant?: 'solid' | 'outline' | 'ghost' | 'link' | 'unstyled'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <ChakraButton
        ref={ref}
        variant={variant}
        size={size}
        isLoading={isLoading}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        className={cx('design-button', className)}
        {...props}
      >
        {children}
      </ChakraButton>
    )
  }
)

Button.displayName = 'Button'
```

### 2. Card 组件

```typescript
// src/components/Card/index.tsx
import React from 'react'
import {
  Box,
  BoxProps,
  useStyleConfig,
} from '@chakra-ui/react'

interface CardProps extends BoxProps {
  variant?: 'elevated' | 'outline' | 'filled'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', children, ...props }, ref) => {
    const styles = useStyleConfig('Card', { variant })
    return (
      <Box ref={ref} sx={styles} {...props}>
        {children}
      </Box>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      fontSize="lg"
      fontWeight="semibold"
      px={6}
      py={4}
      borderBottomWidth="1px"
      {...props}
    >
      {children}
    </Box>
  )
}

export const CardBody = ({ children, ...props }: BoxProps) => {
  return (
    <Box px={6} py={4} {...props}>
      {children}
    </Box>
  )
}

export const CardFooter = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      px={6}
      py={4}
      borderTopWidth="1px"
      display="flex"
      justifyContent="flex-end"
      gap={2}
      {...props}
    >
      {children}
    </Box>
  )
}
```

### 3. Input 组件

```typescript
// src/components/Input/index.tsx
import React from 'react'
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'

interface CustomInputProps extends ChakraInputProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ leftIcon, rightIcon, error, ...props }, ref) => {
    return (
      <InputGroup>
        {leftIcon && (
          <InputLeftElement pointerEvents="none">
            {leftIcon}
          </InputLeftElement>
        )}
        <ChakraInput
          ref={ref}
          {...props}
          borderColor={error ? 'error.500' : undefined}
        />
        {rightIcon && (
          <InputRightElement>
            {rightIcon}
          </InputRightElement>
        )}
      </InputGroup>
    )
  }
)

Input.displayName = 'Input'
```

## 主题配置 (theme/index.ts)

```typescript
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { colors, semanticColors, fonts, fontSizes, fontWeights, lineHeights, space, breakpoints, shadows } from './foundations'
import { componentStyles } from './components'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  colors: {
    ...colors,
    ...semanticColors,
  },
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  space,
  breakpoints,
  shadows,
  components: componentStyles,
  styles: {
    global: {
      body: {
        fontFamily: 'body',
        color: 'text.primary',
        bg: 'bg.primary',
        lineHeight: 'base',
      },
      '*::placeholder': {
        color: 'text.secondary',
      },
      '*, *::before, &::after': {
        borderColor: 'border.default',
      },
    },
  },
})

export default theme
```

## 组件主题样式 (theme/components.ts)

```typescript
export const componentStyles = {
  Button: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'md',
    },
    sizes: {
      xs: {
        h: 8,
        minH: 8,
        fontSize: 'xs',
        px: 3,
      },
      sm: {
        h: 9,
        minH: 9,
        fontSize: 'sm',
        px: 4,
      },
      md: {
        h: 10,
        minH: 10,
        fontSize: 'md',
        px: 4,
      },
      lg: {
        h: 12,
        minH: 12,
        fontSize: 'lg',
        px: 6,
      },
      xl: {
        h: 14,
        minH: 14,
        fontSize: 'xl',
        px: 8,
      },
    },
    variants: {
      solid: {
        bg: 'primary.500',
        color: 'white',
        _hover: {
          bg: 'primary.600',
          _disabled: {
            bg: 'primary.500',
          },
        },
        _active: {
          bg: 'primary.700',
        },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'primary.500',
        color: 'primary.500',
        _hover: {
          bg: 'primary.50',
          _disabled: {
            bg: 'transparent',
          },
        },
        _active: {
          bg: 'primary.100',
        },
      },
      ghost: {
        color: 'primary.500',
        _hover: {
          bg: 'primary.50',
          _disabled: {
            bg: 'transparent',
          },
        },
        _active: {
          bg: 'primary.100',
        },
      },
    },
    defaultProps: {
      size: 'md',
      variant: 'solid',
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'bg.primary',
        borderRadius: 'lg',
        overflow: 'hidden',
      },
    },
    variants: {
      elevated: {
        container: {
          boxShadow: 'lg',
        },
      },
      outline: {
        container: {
          borderWidth: '1px',
          borderColor: 'border.default',
        },
      },
      filled: {
        container: {
          bg: 'bg.secondary',
        },
      },
    },
    defaultProps: {
      variant: 'elevated',
    },
  },
}
```

## Storybook文档

### .storybook/main.ts
```typescript
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config
```

### .storybook/preview.ts
```typescript
import type { Preview } from '@storybook/react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../src/theme'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default preview
```

### Button Story
```typescript
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
}

export const Sizes: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button size="xs" {...args} />
      <Button size="sm" {...args} />
      <Button size="md" {...args} />
      <Button size="lg" {...args} />
      <Button size="xl" {...args} />
    </div>
  ),
}

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading',
  },
}
```

## 工具函数

### 断点工具 (utils/breakpoints.ts)
```typescript
export const breakpoints = {
  sm: '30em',    // 480px
  md: '48em',    // 768px
  lg: '62em',    // 992px
  xl: '80em',    // 1280px
  '2xl': '96em', // 1536px
}

export const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,
}

export const useBreakpointValue = <T>(
  values: { [key: string]: T },
  defaultValue?: T
): T | undefined => {
  // 实现断点值Hook
}
```

### 类名合并 (utils/cx.ts)
```typescript
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cx(...inputs: any[]) {
  return twMerge(clsx(inputs))
}
```

### 动画工具 (utils/animations.ts)
```typescript
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { duration: 0.3 },
  },
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { duration: 0.2 },
  },
}
```

## 依赖详情

### 核心依赖
```json
{
  "@chakra-ui/react": "^3.1.2",              // Chakra UI框架
  "@chakra-ui/anatomy": "^2.2.2",            // 组件解剖学
  "@chakra-ui/icons": "2.0.13",              // 图标库
  "@emotion/react": "11.13.3",               // 样式系统
  "@emotion/styled": "11.10.8",              // 样式系统
  "react-icons": "^4.10.1"                   // React图标
}
```

### 开发工具
```json
{
  "storybook": "7.4.6",                      // 组件文档
  "@storybook/react": "7.4.6",               // React集成
  "@storybook/react-vite": "7.4.6",          // Vite集成
  "@storybook/addon-essentials": "7.4.6",    // 基础插件
  "@storybook/testing-library": "0.2.2",     // 测试工具
  "vitest": "^1",                            // 单元测试
  "@vitest/coverage-v8": "0.34.3",           // 覆盖率
  "tsup": "7.2.0",                           // 打包工具
}
```

### 构建工具
```json
{
  "vite": "4.4.10",                          // 构建工具
  "typescript": "^5.4.5",                    // TypeScript
  "tailwindcss": "^3.4.3",                   // 样式框架
  "postcss": "^8.4.38",                      // CSS处理
  "autoprefixer": "10.4.16",                 // 自动前缀
}
```

## 开发命令

```bash
# 开发
pnpm dev                            # 监听模式构建
pnpm build                          # 构建组件库
pnpm build:force                    # 强制构建

# 文档
pnpm storybook                      # 启动Storybook
pnpm build-storybook                # 构建Storybook
pnpm serve-storybook                # 预览Storybook

# 代码质量
pnpm lint                           # ESLint检查
pnpm fix-all-files                  # 自动修复
pnpm typecheck                      # TypeScript检查

# 测试
pnpm test                           # 运行测试
pnpm test-unit                      # 单元测试
```

## 使用示例

### 在应用中使用
```typescript
// apps/web/src/app/providers.tsx
import { ChakraProvider } from '@chakra-ui/react'
import designTheme from '@tongdelove/design'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={designTheme}>
      {children}
    </ChakraProvider>
  )
}

// apps/web/src/components/Example.tsx
import { Button, Card, CardHeader, CardBody } from '@tongdelove/design'

export function Example() {
  return (
    <Card>
      <CardHeader>Example Card</CardHeader>
      <CardBody>
        <Button variant="solid" size="md">
          Click me
        </Button>
      </CardBody>
    </Card>
  )
}
```

### 自定义主题
```typescript
// apps/web/src/theme/index.ts
import { extendTheme } from '@chakra-ui/react'
import { designTheme } from '@tongdelove/design'

const customTheme = extendTheme({
  ...designTheme,
  colors: {
    ...designTheme.colors,
    primary: {
      500: '#6366F1', // 自定义主色
    },
  },
})

export default customTheme
```

## 最佳实践

### 1. 组件设计
- 保持组件的单一职责
- 使用TypeScript确保类型安全
- 提供合理的默认值
- 支持扩展和定制

### 2. 主题一致性
- 遵循设计系统规范
- 使用语义化颜色
- 统一的间距和圆角
- 一致的动画效果

### 3. 文档规范
- 每个组件都有对应的Story
- 提供使用示例
- 记录所有属性
- 展示变体和状态

### 4. 测试策略
- 单元测试覆盖核心逻辑
- 视觉回归测试
- 可访问性测试
- 性能测试

## 相关资源

- [Chakra UI文档](https://chakra-ui.com/)
- [Emotion文档](https://emotion.sh/docs/introduction)
- [Storybook文档](https://storybook.js.org/)
- [TailwindCSS](https://tailwindcss.com/)

---

*最后更新: 2025-11-02*
