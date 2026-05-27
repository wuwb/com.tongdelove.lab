import { useSearchParams } from 'react-router-dom'
import { Versions } from '@/renderer/components/Versions'

export function AboutPage() {
  const [params] = useSearchParams()

  return (
    <div className="flex flex-col items-center justify-center gap-1 p-6">
      <span className="rounded-sm bg-primary px-1 text-primary-foreground">
        Current version: {params.get('version')}
      </span>
      <Versions />
    </div>
  )
}
