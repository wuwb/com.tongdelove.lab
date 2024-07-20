import { AppleGuide } from '@/features/AppleGuide'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@tongdelove/ui/breadcrumb'
import { Input } from '@tongdelove/ui/input'

const AppleGuidePage = () => {
  return (
    <div className="box max-w-screen-3xl container mx-auto w-full max-w-[1680px]">
      <div className="flex justify-between">
        <main className="w-5/7 grow">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">首页</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/etf-grid">工具</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">生活类</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>苹果设备购买指南</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AppleGuide />
        </main>

        <aside className="w-2/7">
          <div className="ml-4 space-y-3">
            <div>
              <Input
                type="text"
                value="https://lab.printlake.com/tool/apple-guide"
                disabled
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default AppleGuidePage
