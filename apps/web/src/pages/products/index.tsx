import React, { useState } from 'react'
import { Layout } from '@/components/common'
import { Checkbox } from '@/components/ui/checkbox'
import {
  AiOutlineDown,
  AiOutlineUser,
  AiOutlineFilter,
  AiOutlineAppstore,
} from 'react-icons/ai'
import { toaster } from '@/components/ui/toaster'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { ProductCard } from '@/containers/product'
import s from './index.module.css'
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion'
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu'
import { HStack } from '@chakra-ui/react'

const ProductPage = () => {
  const [minimumQuantity, setMiniumQuantity] = useState(0)
  const [category, setCategory] = useState(0)
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

  const handleMiniumQuantityChange = (e) => {
    setMiniumQuantity(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const onChange = (checkedValues) => {
    console.log('checked:', checkedValues)
  }

  const handleMenuClick = (e) => {
    toaster.create({
      description: 'Click on menu item.',
      type: 'info',
    })
  }

  const handleCloseDrawer = () => {
    setMobileFiltersOpen(false)
  }

  const menu = (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm" onClick={handleMenuClick}>
          Open
        </Button>
      </MenuTrigger>
      <MenuContent>
        <Menu.Item value="new-txt">
          <AiOutlineUser />
          New Text File
        </Menu.Item>
        <Menu.Item value="new-file">New File...</Menu.Item>
        <Menu.Item value="new-win">New Window</Menu.Item>
        <Menu.Item value="open-file">Open File...</Menu.Item>
        <Menu.Item value="export">Export</Menu.Item>
      </MenuContent>
    </MenuRoot>
  )

  return (
    <>
      <DrawerRoot
        open={mobileFiltersOpen}
        onOpenChange={(e) => setMobileFiltersOpen(e.open)}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Basic DrawerRoot</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>sidebar content</DrawerBody>
        </DrawerContent>
      </DrawerRoot>

      <div className="flex flex-row">
        <div className={s.leftSidebar}>
          <div className={s.sidebarPanel}>
            <AccordionRoot
              defaultActiveKey={['1', '2', '3', '4']}
              ghost
              expandIconPosition="right"
            >
              <AccordionItem header="最小起订量" key="1">
                <AccordionItemTrigger>最小起订量</AccordionItemTrigger>
                <AccordionItemContent>
                  <RadioGroup
                    onChange={handleMiniumQuantityChange}
                    value={minimumQuantity}
                  >
                    <HStack size={0}>
                      <Radio value={0}>任意数量</Radio>
                      <Radio value={500}>500单位或更少</Radio>
                      <Radio value={1000}>1,000单位或更少</Radio>
                      <Radio value={10000}>10,000单位或更少</Radio>
                    </HStack>
                  </RadioGroup>
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem header="分类" key="2">
                <AccordionItemTrigger>分类</AccordionItemTrigger>
                <AccordionItemContent>
                  <RadioGroup onChange={handleCategoryChange} value={category}>
                    <HStack direction="vertical" size={0}>
                      <Radio value={0}>Boxes</Radio>
                      <Radio value={2}>Child Resistant</Radio>
                      <Radio value={3}>Collateral</Radio>
                      <Radio value={4}>Inner Bags</Radio>
                      <Radio value={5}>Insulation</Radio>
                      <Radio value={6}>Mailers</Radio>
                      <Radio value={7}>Publications</Radio>
                      <Radio value={8}>Retail Bags</Radio>
                      <Radio value={9}>Sewn Bags</Radio>
                      <Radio value={10}>Stickers and Labels</Radio>
                      <Radio value={11}>Tape</Radio>
                      <Radio value={12}>Tubes</Radio>
                      <Radio value={13}>Void Fill</Radio>
                    </HStack>
                  </RadioGroup>
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem header="材质" key="3">
                <AccordionItemTrigger>材质</AccordionItemTrigger>
                <AccordionItemContent>
                  <Checkbox
                    className="flex flex-col"
                    options={materialsOptions}
                    defaultValue={[]}
                    onChange={onChange}
                  />
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem header="环保标准" key="4">
                <AccordionItemTrigger>环保标准</AccordionItemTrigger>
                <AccordionItemContent>
                  <Checkbox
                    className="flex flex-col"
                    options={sustainabilityOptions}
                    defaultValue={[]}
                    onChange={onChange}
                  />
                </AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </div>
        </div>
        <div className={s.mainPanel}>
          <div className="relative z-10 flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
            <div className={s.mainTitle}>包装产品分类</div>
            <div className="flex items-center">
              <MenuRoot overlay={menu} trigger={['click']}>
                <MenuTrigger asChild>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    Sort <AiOutlineDown />
                  </a>
                </MenuTrigger>
              </MenuRoot>
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
