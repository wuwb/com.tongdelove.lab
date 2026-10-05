import { Button } from '@tongdelove/ui/components/button' 
import { TbCircleCheck } from 'react-icons/tb'
import { cn } from '@tongdelove/ui/lib/utils'

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
  const containerClasses = checked
    ? 'bg-purple-100 border-purple-500 text-purple-900'
    : 'bg-gray-100 border-transparent text-gray-900'

  return (
    <div className={cn("flex w-1/3 flex-col gap-4 rounded-xl border p-4", containerClasses)}>
      
      <h3 className="text-xl font-semibold tracking-tight">
        {title}
      </h3>

      <ul className="flex flex-col gap-3">
        {options.map((item) => (
          <li key={item.id} className="flex items-start gap-2">
            {/* ThemeIcon color="blue" radius="xl" */}
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <TbCircleCheck size="1rem" />
            </div>
            
            <span className="text-sm">
              {item.desc}
            </span>
          </li>
        ))}
      </ul>

      {/* Title size="xl" */}
      <h2 className="text-3xl font-bold">
        {typePlan}
      </h2>

      {/* Stack -> Button */}
      <div className="flex flex-col mt-auto">
        <Button 
          size="lg" 
          className="w-full"
          variant={checked ? "default" : "secondary"} // 选中时用默认样式，未选中用次要样式
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}
