import React, { useState } from 'react'
import { Layout } from '@/components/common'
import { Checkbox } from '@/components/ui/checkbox'
import {
  AiOutlineDown,
  AiOutlineUser,
  AiOutlineFilter,
  AiOutlineAppstore,
} from 'react-icons/ai'
import { toast } from '@/components/ui/toaster'
import {
  RadioGroup,
  RadioGroupItem,
} from '@tongdelove/ui/components/radio-group'
import { ProductCard } from '@/containers/product'
import { Seo } from '@/components/common/Seo'
import s from './index.module.css'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const ProductPage = () => {
  const [minimumQuantity, setMiniumQuantity] = useState('0')
  const [category, setCategory] = useState('0')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
  ]

  const materialsOptions = [
    { label: 'Bleached White Liner', value: '' },
    { label: 'Chipboard', value: '' },
    { label: 'Corrugated Board', value: '' },
    { label: 'Kemi White Liner', value: '' },
    { label: 'Mottled White Liner', value: '' },
    { label: 'Natural Kraft Liner', value: '' },
    { label: 'Paperboard', value: '' },
    { label: 'Clay-Coated News Back', value: '' },
    { label: 'Solid Bleachied Sulphate', value: '' },
    { label: 'Solid Unbleached Sulphate', value: '' },
    { label: 'Uncoated Unbleached Kraf', value: '' },
    { label: 'Films', value: '' },
    { label: 'PET Film', value: '' },
    { label: 'PP Film', value: '' },
    { label: 'PVC Film', value: '' },
  ]

  const sustainabilityOptions = [
    { label: 'Bildegradable', value: '' },
    { label: 'Curbside recyclable', value: '' },
    { label: 'Drop-off compostable', value: '' },
    { label: 'Drop-off recyclable', value: '' },
    { label: 'Home compostable', value: '' },
    { label: 'Local production', value: '' },
    { label: 'Plastic-free', value: '' },
    { label: 'Recycled content', value: '' },
    { label: 'Renewable materials', value: '' },
    { label: 'Responsible forestry', value: '' },
    { label: 'Returnable', value: '' },
    { label: 'Reusable', value: '' },
    { label: 'Sustainable inks', value: '' },
  ]

  const handleMiniumQuantityChange = (value: string) => {
    setMiniumQuantity(value)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  const handleMenuClick = () => {
    toast('Click on menu item.')
  }

  const handleCloseDrawer = () => {
    setMobileFiltersOpen(false)
  }

  const menu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" onClick={handleMenuClick}>
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <AiOutlineUser className="mr-2 h-4 w-4" />
          New Text File
        </DropdownMenuItem>
        <DropdownMenuItem>New File...</DropdownMenuItem>
        <DropdownMenuItem>New Window</DropdownMenuItem>
        <DropdownMenuItem>Open File...</DropdownMenuItem>
        <DropdownMenuItem>Export</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <>
      <Seo
        title="产品中心"
        description="半祥包装提供各类高品质包装产品，包括纸箱、彩盒、手提袋、标签等。支持定制化服务，满足不同行业的包装需求。"
        url="/products"
        type="website"
      />
      <Drawer open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Basic Drawer</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">sidebar content</div>
        </DrawerContent>
      </Drawer>

      <div className="flex flex-row">
        <div className={s.leftSidebar}>
          <div className={s.sidebarPanel}>
            <Accordion type="multiple" defaultValue={['1', '2', '3', '4']}>
              <AccordionItem value="1">
                <AccordionTrigger>最小起订量</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    value={minimumQuantity}
                    onValueChange={handleMiniumQuantityChange}
                  >
                    <div className="flex flex-wrap gap-2">
                      <RadioGroupItem value="0" id="qty-0">
                        <label htmlFor="qty-0">任意数量</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="500" id="qty-500">
                        <label htmlFor="qty-500">500单位或更少</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="1000" id="qty-1000">
                        <label htmlFor="qty-1000">1,000单位或更少</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="10000" id="qty-10000">
                        <label htmlFor="qty-10000">10,000单位或更少</label>
                      </RadioGroupItem>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="2">
                <AccordionTrigger>分类</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    value={category}
                    onValueChange={handleCategoryChange}
                  >
                    <div className="flex flex-wrap gap-2">
                      <RadioGroupItem value="0" id="cat-0">
                        <label htmlFor="cat-0">Boxes</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="2" id="cat-2">
                        <label htmlFor="cat-2">Child Resistant</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="3" id="cat-3">
                        <label htmlFor="cat-3">Collateral</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="4" id="cat-4">
                        <label htmlFor="cat-4">Inner Bags</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="5" id="cat-5">
                        <label htmlFor="cat-5">Insulation</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="6" id="cat-6">
                        <label htmlFor="cat-6">Mailers</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="7" id="cat-7">
                        <label htmlFor="cat-7">Publications</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="8" id="cat-8">
                        <label htmlFor="cat-8">Retail Bags</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="9" id="cat-9">
                        <label htmlFor="cat-9">Sewn Bags</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="10" id="cat-10">
                        <label htmlFor="cat-10">Stickers and Labels</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="11" id="cat-11">
                        <label htmlFor="cat-11">Tape</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="12" id="cat-12">
                        <label htmlFor="cat-12">Tubes</label>
                      </RadioGroupItem>
                      <RadioGroupItem value="13" id="cat-13">
                        <label htmlFor="cat-13">Void Fill</label>
                      </RadioGroupItem>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="3">
                <AccordionTrigger>材质</AccordionTrigger>
                <AccordionContent>
                  <fieldset className="space-y-2">
                    <legend className="mb-2 text-sm font-medium">材质</legend>
                    <div className="space-y-1">
                      {materialsOptions.map((item, index) => (
                        <label key={index} className="flex items-center gap-2">
                          <Checkbox />
                          {item.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="4">
                <AccordionTrigger>环保标准</AccordionTrigger>
                <AccordionContent>
                  <fieldset className="space-y-2">
                    <legend className="mb-2 text-sm font-medium">
                      环保标准
                    </legend>
                    <div className="space-y-1">
                      {sustainabilityOptions.map((item, index) => (
                        <label key={index} className="flex items-center gap-2">
                          <Checkbox />
                          {item.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className={s.mainPanel}>
          <div className="relative z-10 flex items-baseline justify-between border-b border-gray-200 pt-6 pb-6">
            <div className={s.mainTitle}>包装产品分类</div>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    Sort <AiOutlineDown />
                  </a>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {sortOptions.map((option) => (
                    <DropdownMenuItem key={option.name}>
                      {option.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <AiOutlineAppstore className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <AiOutlineFilter className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className={s.mainContent}>
            <ul className={s.productGrid}>
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li key={i}>
                  <ProductCard
                    product={{
                      id: 1,
                    }}
                    imgProps={{
                      width: 480,
                      height: 480,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div>行业解决方案</div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ProductPage.Layout = Layout

export default ProductPage
