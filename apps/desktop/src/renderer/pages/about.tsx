import { useSearchParams } from 'react-router-dom'
import { Versions } from '@/renderer/components/Versions'
import { PlaceholderSettings } from '@/renderer/pages/settings/PlaceholderSettings'

export function AboutPage() {
  const [params] = useSearchParams()

  return (
    <div className="flex flex-col w-screen h-screen p-6 items-center justify-center gap-1">
      <p className="text-muted-foreground">A react-router-dom adapter for Electron apps.</p>

      <span className="text-primary-foreground bg-primary rounded-sm px-1">
        Current version: {params.get('version')}
      </span>

      <Versions />
      <PlaceholderSettings title="关于我们" />
    </div>
  )
}
