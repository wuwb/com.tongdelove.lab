import React from 'react'
import { Markdown } from '@/components/common/Markdown'
import { useTranslation } from '@/i18n'

function TimelinePage() {
  const { t } = useTranslation()

  return (
    <div className="container">
      <h1 className="py-10 text-center text-4xl font-bold">{t('Changelog')}</h1>
      <div className="prose dark:prose-invert">
        <Markdown>
          {`
#### 2024.09.12

- [[LOGO 生成器](/logo-gen)]支持 mobile
- [[全局](/)]增加回到顶部
- [[全局](/)]增加历史记录页面
- [[全局](/)]修复侧边按钮选中状态

#### 2024.09.11

- [[LOGO 生成器](/logo-gen)]增加换行，文字偏移，文字行高
- [[LOGO 生成器](/logo-gen)]增加是否给其他用户查看，是否给其他用户下载

#### 2024.09.10

- [[LOGO 生成器](/logo-gen)]增加文字大小同步外框尺寸修改
- [[LOGO 生成器](/logo-gen)]增加重置文字旋转，横向微调，垂直微调
- [[LOGO 生成器](/logo-gen)]增加文字透明度，边框透明度
- [[LOGO 生成器](/logo-gen)]增加部分外款尺寸
- [[LOGO 生成器](/logo-gen)]增加支持谷歌字体
- [[LOGO 生成器](/logo-gen)]优化表单排序及样式
- [[LOGO 生成器](/logo-gen)]增加 buymeacoffee

#### 2024.09.09

- [[LOGO 生成器](/logo-gen)]项目初始化

#### 2022.05.03

- [[苹果购买指南](/tool/apple-guide)]添加苹果购买指南

#### 2022.03.14

- [[全局](/)]项目初始化
        `}
        </Markdown>
      </div>
    </div>
  )
}

export default TimelinePage
