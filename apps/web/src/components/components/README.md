# components/components/ 目录说明

此目录是一个**孤立目录**，其中的组件未被项目任何地方引用。

## 目录来源

这些组件看起来是从 Next.js 博客示例（如 `with-tailwindcss-blog`）复制过来的，包含博客文章展示相关的功能组件。

## 文件列表

| 文件 | 功能 |
|------|------|
| `alert.tsx` | 博客预览提示组件 |
| `cover-image.tsx` | 博客封面图片组件 |
| `hero-post.tsx` | 博客主文章展示组件 |
| `post-preview.tsx` | 博客文章预览组件 |
| `post-header.tsx` | 博客文章头部组件 |
| `post-body.tsx` | 博客文章内容组件 |
| `more-stories.tsx` | 更多文章组件 |
| `categories.tsx` | 文章分类组件 |
| `date-formater.tsx` | 日期格式化组件 |
| `tags.tsx` | 文章标签组件 |
| `EventListItem.tsx` | 事件列表项组件 |
| `Heading.tsx` | 标题组件 |
| `ProjectCard.tsx` | 项目卡片组件 |

## 状态

- **未被引用**: 所有组件都未被项目其他代码引用
- **可安全删除**: 如确认不需要这些博客组件，可删除整个目录

## 建议

如项目不使用博客功能，建议删除此目录以减少代码混乱。
