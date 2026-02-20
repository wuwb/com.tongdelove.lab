# 管理后台模块 - apps/admin

## 导航

> 根目录 / [应用层](../CLAUDE.md#应用模块详解) / **admin**

## 概述

**企业级管理后台** - 基于Ant Design Pro的现成管理后台解决方案

## 技术栈

- **框架**: UMI 4 (Ant Design Pro)
- **前端**: React 18.3.1, TypeScript 5.4.5
- **UI库**: Ant Design 5.8.3, Ant Design Pro Components
- **状态管理**: Redux Toolkit 2.2.3, Redux 4.0.0
- **路由**: React Router 6.23.1
- **数据可视化**: AntV Charts, G2Plot, G6
- **表单**: Formily 2.3.2
- **开发工具**: @umijs/max, Storybook

## 目录结构

```
apps/admin/
├── src/
│   ├── components/              # 可复用组件
│   │   ├── FilterItem/         # 过滤器组件
│   │   ├── Loader/             # 加载器
│   │   ├── Editor/             # 富文本编辑器
│   │   └── DropOption/         # 下拉选项
│   ├── pages/                  # 页面组件
│   │   ├── dashboard/          # 仪表盘
│   │   ├── user/               # 用户管理
│   │   ├── system/             # 系统设置
│   │   └── report/             # 报表页面
│   ├── layouts/                # 布局组件
│   │   ├── SecurityLayout.tsx  # 安全布局
│   │   └── UserLayout.tsx      # 用户布局
│   ├── services/               # API服务
│   │   ├── api.ts              # API封装
│   │   └── mock/               # 模拟数据
│   ├── models/                 # 数据模型
│   │   ├── user.ts             # 用户模型
│   │   └── global.ts           # 全局模型
│   ├── hooks/                  # 自定义Hooks
│   │   ├── useAccess.ts        # 权限Hook
│   │   └── useLoading.ts       # 加载状态Hook
│   ├── store/                  # Redux Store
│   │   ├── index.ts
│   │   └── slices/
│   ├── locales/                # 国际化
│   │   ├── zh-CN/
│   │   └── en-US/
│   ├── utils/                  # 工具函数
│   │   ├── auth.ts             # 认证工具
│   │   └── request.ts          # 请求工具
│   ├── access.ts               # 权限配置
│   ├── app.tsx                 # 应用入口
│   ├── global.less             # 全局样式
│   ├── requestConfig.ts        # 请求配置
│   └── manifest.json           # 清单文件
├── .umirc.ts                   # UMI配置
├── config/
│   └── proxy.ts                # 代理配置
├── mock/                       # 模拟数据
├── tests/                      # 测试文件
├── docker/                     # Docker配置
├── Dockerfile.hub              # Hub镜像
├── package.json
└── tsconfig.json
```

## 核心功能

### 1. 仪表盘 (Dashboard)
- 数据统计卡片
- 图表展示 (折线图、柱状图、饼图)
- 实时数据更新
- KPI指标监控

### 2. 用户管理 (User Management)
- 用户列表 (ProTable)
- 用户创建/编辑
- 权限分配
- 用户状态管理

### 3. 系统设置 (System Settings)
- 基础配置
- 权限配置
- 操作日志
- 系统监控

### 4. 报表分析 (Reports)
- 数据可视化
- 导出功能
- 自定义报表
- 趋势分析

## Ant Design Pro组件

### ProTable - 专业表格
```typescript
import { ProTable } from '@ant-design/pro-components'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    valueType: 'text',
    width: 150,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    valueType: 'text',
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      active: { text: '启用', status: 'Success' },
      inactive: { text: '禁用', status: 'Error' },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
    hideInSearch: true,
  },
]

export default function UserTable() {
  return (
    <ProTable
      columns={columns}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      request={async (params) => {
        const result = await api.getUsers(params)
        return {
          data: result.data,
          success: result.success,
          total: result.total,
        }
      }}
      pagination={{
        pageSize: 10,
      }}
      toolBarRender={() => [
        <Button key="button" type="primary">
          新建用户
        </Button>,
      ]}
    />
  )
}
```

### ProForm - 专业表单
```typescript
import { ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-form'
import { Modal } from 'antd'

export function UserForm({ visible, onCancel, onSubmit }: Props) {
  return (
    <Modal
      title="用户信息"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <ProForm
        formRef={formRef}
        layout="vertical"
        onFinish={async (values) => {
          await onSubmit(values)
        }}
      >
        <ProFormText
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        />
        <ProFormText
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效邮箱' },
          ]}
        />
        <ProFormSelect
          name="role"
          label="角色"
          options={[
            { label: '管理员', value: 'admin' },
            { label: '普通用户', value: 'user' },
          ]}
          rules={[{ required: true, message: '请选择角色' }]}
        />
      </ProForm>
    </Modal>
  )
}
```

### ProLayout - 专业布局
```typescript
import { ProLayout, PageContainer } from '@ant-design/pro-layout'
import { Link, useLocation } from 'react-router-dom'

const route = {
  path: '/',
  routes: [
    {
      path: '/dashboard',
      name: '仪表盘',
      icon: 'DashboardOutlined',
    },
    {
      path: '/user',
      name: '用户管理',
      icon: 'UserOutlined',
    },
    {
      path: '/system',
      name: '系统设置',
      icon: 'SettingOutlined',
    },
  ],
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <ProLayout
      title="管理后台"
      route={route}
      location={location}
      logo={logo}
      menu={{
        locale: false,
      }}
      rightContentRender={() => (
        <div>
          <Avatar size="small" />
        </div>
      )}
    >
      <PageContainer>{children}</PageContainer>
    </ProLayout>
  )
}
```

## 数据可视化

### Charts图表
```typescript
import { Line, Column, Pie } from '@ant-design/charts'

// 折线图
const LineChart = () => {
  const config = {
    data: chartData,
    xField: 'date',
    yField: 'value',
    smooth: true,
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  }
  return <Line {...config} />
}

// 柱状图
const ColumnChart = () => {
  const config = {
    data: chartData,
    xField: 'category',
    yField: 'value',
    color: '#52c41a',
    meta: {
      value: {
        alias: '数量',
      },
    },
  }
  return <Column {...config} />
}

// 饼图
const PieChart = () => {
  const config = {
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  }
  return <Pie {...config} />
}
```

## 权限管理

### 权限配置 (access.ts)
```typescript
export const getInitialState = async () => {
  // 获取当前用户信息
  const currentUser = await fetchUserInfo()
  return {
    currentUser,
    settings: {},
  }
}

export const access = {
  canAdmin: (currentUser: any) => {
    return currentUser?.role === 'admin'
  },
  canEdit: (currentUser: any, record: any) => {
    return (
      currentUser?.role === 'admin' ||
      currentUser?.id === record?.ownerId
    )
  },
  canDelete: (currentUser: any, record: any) => {
    return currentUser?.role === 'admin'
  },
}
```

### 权限Hook (hooks/useAccess.ts)
```typescript
import { useModel } from '@umijs/max'
import { access } from '@/access'

export function useAccess() {
  const { initialState } = useModel('@@initialState')

  return {
    // 是否为管理员
    isAdmin: () => access.canAdmin(initialState?.currentUser),
    // 是否可编辑
    canEdit: (record: any) => access.canEdit(initialState?.currentUser, record),
    // 是否可删除
    canDelete: (record: any) => access.canDelete(initialState?.currentUser, record),
  }
}
```

## API服务

### 请求封装 (services/api.ts)
```typescript
import { request } from '@umijs/max'

// 用户相关API
export const userApi = {
  // 获取用户列表
  getUsers: (params?: any) =>
    request('/api/users', {
      method: 'GET',
      params,
    }),

  // 创建用户
  createUser: (data: any) =>
    request('/api/users', {
      method: 'POST',
      data,
    }),

  // 更新用户
  updateUser: (id: string, data: any) =>
    request(`/api/users/${id}`, {
      method: 'PUT',
      data,
    }),

  // 删除用户
  deleteUser: (id: string) =>
    request(`/api/users/${id}`, {
      method: 'DELETE',
    }),
}

// 系统相关API
export const systemApi = {
  // 获取系统信息
  getSystemInfo: () =>
    request('/api/system/info'),

  // 更新系统配置
  updateConfig: (data: any) =>
    request('/api/system/config', {
      method: 'PUT',
      data,
    }),
}
```

## 状态管理 (Redux Toolkit)

### Store配置 (store/index.ts)
```typescript
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### User Slice (store/slices/userSlice.ts)
```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userApi } from '@/services/api'

// 异步操作
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (params?: any) => {
    const response = await userApi.getUsers(params)
    return response.data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false
      })
  },
})

export default userSlice.reducer
```

## 表单开发 (Formily)

### Schema表单
```typescript
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input, Select, DatePicker, FormItem } from '@formily/antd'

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    DatePicker,
    FormItem,
  },
})

const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入用户名',
      },
      'x-validator': [
        {
          required: true,
          message: '请输入用户名',
        },
        {
          min: 3,
          message: '用户名至少3个字符',
        },
      ],
    },
    email: {
      type: 'string',
      title: '邮箱',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入邮箱',
      },
      'x-validator': [
        {
          required: true,
          message: '请输入邮箱',
        },
        {
          type: 'email',
          message: '请输入有效邮箱',
        },
      ],
    },
  },
}

export function FormilyForm() {
  const form = createForm()

  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
    </FormProvider>
  )
}
```

## 依赖详情

### Ant Design Pro
```json
{
  "@ant-design/pro-components": "^2.6.12",    // Pro组件
  "@ant-design/pro-form": "2.31.6",           // Pro表单
  "@ant-design/pro-layout": "^7.16.8",        // Pro布局
  "@ant-design/pro-table": "3.18.6",          // Pro表格
  "@ant-design/charts": "^2.1.0",             // 图表
  "@ant-design/plots": "^2.2.1",              // 更多图表
  "antd": "^5.8.3",                           // Ant Design
  "antd-style": "^3.4.4"                      // 样式系统
}
```

### 可视化库
```json
{
  "@antv/data-set": "^0.11.8",                // 数据处理
  "@antv/g2": "^5.1.19",                      // 图表引擎
  "@antv/g2plot": "^2.4.31",                  // 图表库
  "@antv/g6": "^4.8.20",                      // 图可视化
  "@antv/l7": "^2.17.8",                      // 地图可视化
}
```

### 表单和编辑器
```json
{
  "@formily/antd-v5": "1.0.1-rc.2",           // Formily AntD
  "@formily/core": "2.3.2",                   // 表单核心
  "@formily/react": "2.3.2",                  // React集成
  "react-quill": "^1.3.5",                    // 富文本编辑
  "draft-js": "^0.11.7",                      // 文本编辑
}
```

### 开发工具
```json
{
  "@umijs/max": "^4.2.5",                     // UMI框架
  "umi-presets-pro": "^2.0.3",                // UMI预设
  "react-dev-inspector": "^1.8.6",            // 开发调试
  "@codemirror/view": "^6.16.0",              // 代码编辑器
}
```

## 开发命令

```bash
# 开发
pnpm start                           # 启动开发服务器
pnpm start:dev                       # 开发环境
pnpm start:no-mock                   # 无模拟数据
pnpm start:test                      # 测试环境
pnpm start:pre                       # 预发布环境

# 构建
pnpm build                           # 生产构建
pnpm analyze                         # 构建分析
pnpm preview                         # 预览构建结果

# 代码质量
pnpm lint                            # ESLint检查
pnpm lint:fix                        # 自动修复
pnpm lint:js                         # JavaScript检查
pnpm lint:prettier                   # Prettier检查
pnpm tsc                             # TypeScript检查

# 测试
pnpm test:e2e                        # E2E测试
pnpm playwright                      # Playwright测试

# 国际化
pnpm i18n-remove                     # 移除国际化
```

## Docker部署

### Dockerfile.hub
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN pnpm install

COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  admin:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:80'
    environment:
      - NODE_ENV=production
    depends_on:
      - server
```

## 最佳实践

### 1. 性能优化
- 使用 `ProTable` 的虚拟滚动
- 路由级别的代码分割
- 图片懒加载和CDN加速
- 使用 `useRef` 和 `useMemo` 避免重复渲染

### 2. 状态管理
- 全局状态使用 Redux Toolkit
- 组件状态使用 `useState`
- 表单状态使用 `useForm` (Formily)
- 服务端状态使用 SWR 或 React Query

### 3. 权限控制
- 前端路由守卫
- 按钮级权限控制
- 页面级权限验证
- 数据级权限过滤

### 4. 错误处理
- 全局错误边界
- API请求错误统一处理
- 优雅降级处理
- 错误日志上报

## 常见问题

### Q: 如何自定义主题？
A:
```typescript
// 在 .umirc.ts 中
export default {
  theme: {
    token: {
      colorPrimary: '#52c41a',
      borderRadius: 4,
    },
  },
}
```

### Q: 如何添加新的页面？
A:
1. 在 `src/pages/` 下创建目录
2. 创建 `index.tsx` 文件
3. 在路由配置中注册
4. 在菜单配置中添加

### Q: 如何接入新的API？
A:
1. 在 `src/services/` 下创建 API 文件
2. 使用 `request` 函数封装
3. 在 Model 中调用 API
4. 在组件中使用 Model

### Q: 如何处理大量数据？
A:
```typescript
// 使用虚拟滚动
<ProTable
  // ... 其他配置
  options={false}
  pagination={{
    pageSize: 100,
  }}
  scroll={{ y: 400 }}
  // 开启虚拟滚动
  />
```

## 相关资源

- [Ant Design Pro文档](https://pro.ant.design/)
- [UMI文档](https://umijs.org/)
- [Formily文档](https://formilyjs.org/)
- [AntV图表](https://g2plot.antv.vision/)

---

*最后更新: 2025-11-02*
