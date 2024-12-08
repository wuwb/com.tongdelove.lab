import Link from 'next/link'
import { SidebarSection } from './SidebarSection'
import { useTranslation } from '@/i18n'

export const Sidebar = () => {
  const { t } = useTranslation()

  return (
    <div className="flex w-[40%] flex-col gap-2.5 p-2.5">
      <SidebarSection>
        <div>https://lab.printlake.com/tool/book-thickness</div>
      </SidebarSection>
      <SidebarSection title={t('作者')}>
        <Link href="https://blog.tongdelove.com">吴文斌</Link>
      </SidebarSection>
    </div>
  )
}
