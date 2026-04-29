# AGENTS.md - UI Component Library

> **Last Updated**: 2025-02-27
> **Stack**: Mantine UI + TailwindCSS
> **Purpose**: Shared UI components for the monorepo

---

## 📦 Component Library

The `@tongdelove/ui` package provides reusable UI components used across web, lab, admin, and desktop applications.

### Tech Stack

- **Mantine UI**: Component framework
- **TailwindCSS**: Utility-first styling
- **React Hooks**: State management

### Directory Structure

```
packages/ui/
├── src/
│   ├── components/         # 50+ UI components
│   │   ├── button/
│   │   ├── dialog/
│   │   ├── input/
│   │   ├── card/
│   │   ├── checkbox/
│   │   ├── radio/
│   │   ├── select/
│   │   ├── tooltip/
│   │   └── ...
│   └── index.ts            # Public API exports
├── tailwind.config.ts      # Tailwind configuration
└── package.json
```

### Key Components

#### Form Components

- `Input` - Text, number, etc.
- `Checkbox` - Checkbox inputs
- `Radio` - Radio button groups
- `Select` - Dropdown selections
- `Switch` - Toggle switches
- `Textarea` - Multi-line text
- `PasswordField` - Secure inputs

#### Layout Components

- `Container` - Responsive container
- `Card` - Card container
- `Stack` - Flexbox layout
- `Grid` - Grid layout
- `Group` - Group elements

#### Feedback Components

- `Alert` - Alert messages
- `LoadingIndicator` - Loading states
- `EmptyState` - Empty state display
- `Error` - Error display

#### Navigation Components

- `Button` - Various button styles
- `Link` - Links
- `Breadcrumb` - Navigation breadcrumbs
- `Pagination` - Pagination controls

#### Display Components

- `Avatar` - User avatars
- `Badge` - Status badges
- `Tag` - Tags and labels
- `Divider` - Visual separators

#### Overlay Components

- `Dialog` - Modal dialogs
- `Drawer` - Side panels
- `Popover` - Popover menus
- `Tooltip` - Tooltips

---

## 🎯 Usage Patterns

### Importing Components

```typescript
import { Button, Dialog, Input } from '@tongdelove/ui'

export function MyPage() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <Input placeholder="Enter something" />
      </DialogContent>
    </Dialog>
  )
}
```

### Component Props Pattern

**Standard Props**:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  children: React.ReactNode
}
```

### Theming

TailwindCSS configuration extends shared theme.

---

## 🔧 Development

### Running in Watch Mode

```bash
# Start watch mode
cd packages/ui
pnpm dev

# Build
pnpm build

# Type check
pnpm typecheck
```

### Adding New Components

1. Create directory: `src/components/my-component/`
2. Create `index.tsx` with component
3. Add styles if needed
4. Export from `src/index.ts`
5. Add examples if needed

---

## 📊 Component List

### Forms

- Input, Textarea, PasswordField, Checkbox, Radio, Switch, Select
- Field, CheckboxCard, RadioCard, InputGroup, NumberInput
- PinInput, NativeSelect, FileButton

### Buttons & Actions

- Button, LinkButton, Link, Toggle, Action-Bar

### Cards & Containers

- Box, Card, Container, Wrapper, Stack, Group

### Feedback & Loading

- Alert, Badge, Tag, Avatar, Status, CloseButton
- LoadingIndicator, LoadingSpinner, EmptyState, Error

### Dialogs & Overlays

- Dialog, Drawer, Popover, Menu, Tooltip, HoverCard

### Navigation

- Breadcrumb, Pagination, SegmentedControl, Steps, StepperInput

### Data Display

- DataList, Progress, ProgressCircle, Rating, RichText, Timeline

---

## 🤝 Contributing

1. Follow Mantine component patterns
2. Use TailwindCSS for styling
3. Include TypeScript types
4. Ensure accessibility
5. Test in consuming apps

---

_See Mantine documentation for component APIs_
