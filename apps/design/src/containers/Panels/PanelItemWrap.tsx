import { Tabs } from 'antd'

interface PanelItemProps {
  children?: React.ReactNode
  index?: number
  value: string
}

export const PanelItemWrap = (props: PanelItemProps) => {
  const { children, value, index, ...other } = props

  return (
    <Tabs.Panel
      className="w-[250px]"
      value={value}
      role="tabpanel"
      id={`vertical-tabpanel-${value}`}
      aria-labelledby={`vertical-tab-${value}`}
      {...other}
    >
      {children}
    </Tabs.Panel>
  )
}
