import { IconType } from 'react-icons'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@tongdelove/ui/components/card'
import Link from 'next/link'

interface ToolCardProps {
  title: string
  Icon?: IconType
  index?: number // Make index optional as it wasn't really used
  desc: string
  href: string
}

export const ToolCard = ({ title, href, desc, Icon }: ToolCardProps) => {
  return (
    <Link href={href} className="block h-full">
      <Card className="h-full transition-shadow hover:shadow-lg flex flex-col">
        <CardHeader className="flex-none p-6 pb-2">
          <div className="flex items-center justify-center p-4 bg-muted/20 rounded-lg mb-4 h-24">
            {Icon && <Icon size={40} className="text-primary" />}
          </div>
          <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-6 pt-2">
          <p className="text-sm text-muted-foreground line-clamp-3 text-center">
            {desc}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
