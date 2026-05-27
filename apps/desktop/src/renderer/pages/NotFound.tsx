import { Button } from '@/renderer/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="p-10 pt-20 text-center">
      <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">404</h1>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">页面未找到</h2>
      <p className="text-base text-gray-500 mb-8 max-w-md mx-auto">
        抱歉，您访问的页面不存在或已被移动。
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Button variant="outline" size="lg" className="min-w-30" onClick={handleGoBack}>
          返回
        </Button>
        <Button size="lg" className="min-w-30" onClick={handleGoHome}>
          回到首页
        </Button>
      </div>
    </div>
  )
}
