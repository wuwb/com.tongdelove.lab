import { Daohang } from '@/features/links/Links'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@tongdelove/ui/accordion"

// ## 运营数据
// https://lunarcrush.com/
// https://app.santiment.net/#screeners
// https://www.similarweb.com/zh/

// 圆圈拉线成图算法
// https://github.com/jiang1997/image2seq

export default function DaohangPage() {
  return (
    <div className="flex">
      <div className="flex w-[240px]">
        <div className="w-[120px]">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>农业技术</AccordionTrigger>
              <AccordionContent>
                <div>农</div>
                <div>牧</div>
                <div>渔</div>
                <div>林</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>工业技术</AccordionTrigger>
              <AccordionContent>
                <div>计算机</div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
        <div className="w-[120px]">
          二级侧边栏
        </div>
      </div>

      <div className="grow">
        <Daohang />
      </div>
    </div>
  )
}
