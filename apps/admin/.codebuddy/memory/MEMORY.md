# MEMORY

## 项目约定（apps/admin，UMI 4 / Ant Design Pro）
- 代码风格：prettier 无分号（semi: false）、单引号、es5 尾逗号、2 空格缩进。
- 样式优先用 `antd-style` 的 `createStyles`（admin 已声明依赖）；不要引入 styled-components 等未声明依赖。
- pnpm workspace 使用 `shamefully-hoist=true`，其他 app（desktop/lab/design）的依赖可通过提升被 admin 解析到，但属幽灵依赖，新增页面依赖时尽量复用 admin 已声明的包。
- 路由集中在 `config/routes.ts`，菜单可直接用中文 name（会触发 React Intl missing message 警告，项目现状如此）。
- admin 使用 React 19：不要用 `findDOMNode`、`ReactDOM.render`；`InputHTMLAttributes` 等类型需显式泛型；全局 `JSX` 命名空间已移除，用 `React.JSX.Element`。
- 项目 `tsc --noEmit` 存在大量（500+）存量类型错误，属正常基线，勿试图全部修复。
- monorepo 根不允许随便跑 `pnpm install`（会大改 lockfile）；新增依赖需谨慎。

## 用户相关
- 用户关注周期股投资时以商品价格周期为准，不看股息（见 agent memory）。
