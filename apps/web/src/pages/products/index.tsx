import React, { useState } from 'react'
import { Layout } from '@/components/common'
import {
  Collapse,
  Radio,
  Input,
  Space,
  Checkbox,
  Menu,
  Dropdown,
  Button,
  message,
  Tooltip,
  Drawer,
} from 'antd'
import {
  DownOutlined,
  UserOutlined,
  FilterOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { ProductCard } from '@/containers/product'
import s from './index.module.css'
import { useRouter } from 'next/router'

const { Panel } = Collapse

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const Page = () => {
  const [minimumQuantity, setMiniumQuantity] = useState(0)
  const [category, setCategory] = useState(0)
  const router = useRouter()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  console.log('router: ', router)

  function handleMiniumQuantityChange(e) {
    setMiniumQuantity(e.target.value)
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value)
  }

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues)
  }

  function handleMenuClick(e) {
    message.info('Click on menu item.')
    console.log('click', e)
  }

  function handleCloseDrawer() {
    setMobileFiltersOpen(false)
  }

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

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={handleCloseDrawer}
        visible={mobileFiltersOpen}
      >
        sidebar content
      </Drawer>
      <div className="flex flex-row">
        <div className={s.leftSidebar}>
          <div className={s.sidebarPanel}>
            <Collapse
              defaultActiveKey={['1', '2', '3', '4']}
              ghost
              expandIconPosition="right"
            >
              <Panel header="最小起订量" key="1">
                <Radio.Group
                  onChange={handleMiniumQuantityChange}
                  value={minimumQuantity}
                >
                  <Space direction="vertical" size={0}>
                    <Radio value={0}>任意数量</Radio>
                    <Radio value={500}>500单位或更少</Radio>
                    <Radio value={1000}>1,000单位或更少</Radio>
                    <Radio value={10000}>10,000单位或更少</Radio>
                  </Space>
                </Radio.Group>
              </Panel>
              <Panel header="分类" key="2">
                <Radio.Group onChange={handleCategoryChange} value={category}>
                  <Space direction="vertical" size={0}>
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
                  </Space>
                </Radio.Group>
              </Panel>
              <Panel header="材质" key="3">
                <Checkbox.Group
                  className="flex flex-col"
                  options={materialsOptions}
                  defaultValue={[]}
                  onChange={onChange}
                />
              </Panel>
              <Panel header="环保标准" key="4">
                <Checkbox.Group
                  className="flex flex-col"
                  options={sustainabilityOptions}
                  defaultValue={[]}
                  onChange={onChange}
                />
              </Panel>
            </Collapse>
          </div>
        </div>
        <div className={s.mainPanel}>
          <div className="relative z-10 flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
            <div className={s.mainTitle}>包装产品分类</div>
            <div className="flex items-center">
              <Dropdown overlay={menu} trigger={['click']}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Sort <DownOutlined />
                </a>
              </Dropdown>
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <AppstoreOutlined className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterOutlined className="h-5 w-5" aria-hidden="true" />
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

Page.Layout = Layout

export default Page
