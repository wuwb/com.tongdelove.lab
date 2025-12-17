import React from 'react'
import { useTranslation } from '@/i18n'
import Link from 'next/link'
import { Badge } from '@tongdelove/ui/components/badge'
import { cn } from '@tongdelove/ui/lib/utils'
import { Circle, GitCommit } from 'lucide-react'

interface ChangelogItem {
  date: string
  details: {
    module: string
    link: string
    content: string
  }[]
}

const CHANGELOGS: ChangelogItem[] = [
  {
    date: '2024.09.28',
    details: [
      { module: '首页', link: '/', content: '首页兼容移动端' },
      { module: '全局', link: '/', content: '优化移动端侧边栏' },
    ],
  },
  {
    date: '2024.09.17',
    details: [
      { module: '中国传统色', link: '/tool/color', content: '界面优化' },
    ],
  },
  {
    date: '2024.09.16',
    details: [
      { module: 'LOGO 生成器', link: '/logo-gen', content: '支持复刻图标' },
      { module: 'LOGO 生成器', link: '/logo-gen', content: '增加用户分享的图标' },
    ],
  },
  {
    date: '2024.09.12',
    details: [
      { module: 'LOGO 生成器', link: '/logo-gen', content: '支持 mobile' },
      { module: '全局', link: '/', content: '增加回到顶部' },
      { module: '历史记录', link: '/changelog', content: '增加历史记录页面' },
      { module: '全局', link: '/', content: '修复侧边按钮选中状态' },
    ],
  },
  {
    date: '2024.09.11',
    details: [
      { module: 'LOGO 生成器', link: '/logo-gen', content: '增加换行，文字偏移，文字行高' },
      { module: 'LOGO 生成器', link: '/logo-gen', content: '增加是否给其他用户查看，是否给其他用户下载' },
    ],
  },
  {
    date: '2024.09.10',
    details: [
      { module: 'LOGO 生成器', link: '/logo-gen', content: '增加文字大小同步外框尺寸修改' },
      { module: 'LOGO 生成器', link: '/logo-gen', content: '增加重置文字旋转，横向微调，垂直微调' },
      { module: 'LOGO 生成器', link: '/logo-gen', content: '增加文字透明度，边框透明度' },
      { module: 'LOGO 生成器', link: '/logo-gen', content: '增加部分外款尺寸' },
      { module: 'LOGO 生成器', link: '/logo-gen', content: '增加支持谷歌字体' },
      { module: 'LOGO 生成器', link: '/logo-gen', content: '优化表单排序及样式' },
      { module: 'LOGO 生成器', link: '/logo-gen', content: '增加 buymeacoffee' },
    ],
  },
  {
    date: '2024.09.09',
    details: [
      { module: 'LOGO 生成器', link: '/logo-gen', content: '项目初始化' },
    ],
  },
  {
    date: '2022.05.03',
    details: [
      { module: '苹果购买指南', link: '/tool/apple-guide', content: '添加苹果购买指南' },
    ],
  },
  {
    date: '2022.03.14',
    details: [
      { module: '全局', link: '/', content: '项目初始化' },
    ],
  },
]

function TimelinePage() {
  const { t } = useTranslation()

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t('更新日志')}</h1>
        <p className="text-muted-foreground text-lg">
          {t('持续迭代，为您提供更好的产品体验')}
        </p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-[8.5rem] top-2 h-[calc(100%-20px)] w-0.5 bg-border -z-10" />

        <div className="space-y-12">
          {CHANGELOGS.map((item, index) => (
            <div key={index} className="relative flex flex-col md:flex-row gap-8 md:gap-0 group">
              {/* Date */}
              <div className="flex items-center md:justify-end md:w-32 md:pr-8 flex-shrink-0">
                <div className="md:hidden absolute left-[11px] top-6 w-0.5 h-full bg-border -z-10"></div>
                <div className="flex items-center gap-4 md:gap-0">
                  <div className="absolute md:relative left-1 md:left-auto p-1 bg-background rounded-full border border-primary text-primary shadow-sm z-10">
                    <GitCommit size={16} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground pl-10 md:pl-0 font-mono">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 pl-10 md:pl-8">
                <div className="p-1 space-y-3">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <Link
                        href={detail.link}
                        className="flex-shrink-0 mt-0.5 hover:opacity-80 transition-opacity"
                      >
                        <Badge variant="secondary" className="font-normal">
                          {detail.module}
                        </Badge>
                      </Link>
                      <span className="text-sm leading-6 text-foreground/90">
                        {detail.content}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimelinePage
