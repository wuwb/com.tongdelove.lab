import { IconType } from 'react-icons'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core'
import Link from 'next/link'

interface ToolCardProps {
  title: string
  Icon?: IconType
  index: number
  desc: string
  href: string
}

export const ToolCard = ({ title, href, index, desc, Icon }: ToolCardProps) => {
  return (
    <Link href={href}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="hover:shadow-lg"
      >
        <Card.Section className="border-b">
          <div className="flex-center h-[120px] w-full px-4 pb-3 pt-2 text-center font-bold text-black">
            {Icon && <Icon size={30} />}
          </div>
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{title}</Text>
        </Group>

        <Text size="sm" c="dimmed" className="min-h-[42px]">
          {desc}
        </Text>
      </Card>
    </Link>
  )
}
