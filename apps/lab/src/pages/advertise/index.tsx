import { Divider, Box, Flex, Button, Text, Container, Input, Textarea, Stack, List, ListItem, Title, ThemeIcon } from '@mantine/core'

import { TbCircleCheck } from 'react-icons/tb'

// 广告价位
// 时间	价格(￥)	RMB / 天	描述

// 1个月
// 599
// 19.9
// 文章右下角区域

// 6个月(半年)
// 2699
// 14.9
// 文章尾部区域

// 1年
// 3649
// 9.9
// 文章顶部区域

const options1 = [
  { id: 1, desc: '文章右下角区域' },
  { id: 2, desc: '19.9元每天' },
  { id: 3, desc: '1 个月广告' },
]

const options2 = [
  { id: 1, desc: '文章尾部区域' },
  { id: 2, desc: '14.9元每天' },
  { id: 3, desc: '6 个月广告' },
]

const options3 = [
  { id: 1, desc: '文章顶部区域' },
  { id: 2, desc: '9.9元每天' },
  { id: 3, desc: '1 年广告' },
]
interface PackageTierProps {
  title: string
  options: Array<{ id: number; desc: string }>
  typePlan: string
  checked?: boolean
}
const PackageTier = ({ title, options, typePlan, checked = false }: PackageTierProps) => {
  const colorTextLight = checked ? 'white' : 'purple.600'
  const bgColorLight = checked ? 'purple.400' : 'gray.300'

  const colorTextDark = checked ? 'white' : 'purple.500'
  const bgColorDark = checked ? 'purple.400' : 'gray.300'

  return (
    <Stack p={3} py={3}>
      <Title size="md">{title}</Title>
      <List spacing={3}>
        {options.map((desc, id) => (
          <ListItem
            key={desc.id}
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <TbCircleCheck size="1rem" />
              </ThemeIcon>
            }
          >
            {desc.desc}
          </ListItem>
        ))}
      </List>
      <Title size="xl">{typePlan}</Title>
      <Stack>
        <Button size="md">Get Started</Button>
      </Stack>
    </Stack>
  )
}

const ThreeTierPricingHorizontal = () => {
  return (
    <Box py={6} px={80}>
      <Stack>
        <Stack p={5}>
          <Stack>
            <Title size="lg">
              The Right Plan for <Text color="purple.400">Your Business</Text>
            </Title>
          </Stack>
          <Stack>
            <Text>本站需要大量资金进行维护与迭代，为了给大家带来更优质的服务与内容，所以决定增加少许广告展示。在此感谢大家的厚爱与支持！</Text>
            <Text>
              展示位置： 1.首页banner位置 2.首页精品软件top3，3个广告位置 广告类型： 1.必须是合法的优质广告 2.必须是经过专业检测后无毒无后门的Mac应用 联系方式： 欢迎合作！
            </Text>
          </Stack>
        </Stack>
        <Divider />
        <PackageTier title="1 个月广告" typePlan="599" options={options1} />
        <Divider />
        <PackageTier title="6 个月广告" checked={true} typePlan="2699" options={options2} />
        <Divider />
        <PackageTier title="1 年广告" typePlan="3649" options={options3} />
      </Stack>
    </Box>
  )
}

export default ThreeTierPricingHorizontal
