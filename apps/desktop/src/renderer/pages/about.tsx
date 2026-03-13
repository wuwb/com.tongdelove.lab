import { useSearchParams } from 'react-router-dom'
import { Versions } from '@/renderer/components/Versions'

export function AboutPage() {
  const [params] = useSearchParams()

  return (
    <div className="flex flex-col p-6 items-center justify-center gap-1">
      <span className="text-primary-foreground bg-primary rounded-sm px-1">
        Current version: {params.get('version')}
      </span>
      <Versions />
    </div>
  )
}
