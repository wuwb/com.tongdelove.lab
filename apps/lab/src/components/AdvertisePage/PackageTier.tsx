import { Button, Stack, List, ListItem, Title, ThemeIcon } from '@mantine/core'
import { TbCircleCheck } from 'react-icons/tb'

interface PackageTierProps {
  title: string
  options: Array<{ id: number; desc: string }>
  typePlan: string
  checked?: boolean
}

export const PackageTier = ({
  title,
  options,
  typePlan,
  checked = false,
}: PackageTierProps) => {
  const colorTextLight = checked ? 'white' : 'purple.600'
  const bgColorLight = checked ? 'purple.400' : 'gray.300'
  const colorTextDark = checked ? 'white' : 'purple.500'
  const bgColorDark = checked ? 'purple.400' : 'gray.300'

  return (
    <Stack p={3} py={3} className="w-1/3">
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
