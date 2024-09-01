import { Card } from '@tongdelove/ui/card'
import { Input } from '@tongdelove/ui/input'
import { Label } from '@tongdelove/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@tongdelove/ui/select'

function PaperPricTransformTool() {
  return (
    <div className="box max-w-screen-3xl container mx-auto w-full max-w-[1680px]">
      <div className="flex flex-col justify-between gap-2">
        {/* <Card> */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="纸张尺寸" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">147g</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="纸张克重" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">147g</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex flex-col gap-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">令重</Label>
            <Input type="email" id="email" placeholder="" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">令数</Label>
            <Input type="email" id="email" placeholder="" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">吨价</Label>
            <Input type="email" id="email" placeholder="" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">令价</Label>
            <Input type="email" id="email" placeholder="" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">单价</Label>
            <Input type="email" id="email" placeholder="" />
          </div>
        </div>
        {/* </Card> */}
      </div>
    </div>
  )
}

export default PaperPricTransformTool
