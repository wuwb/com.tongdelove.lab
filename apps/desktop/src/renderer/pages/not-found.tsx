import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1) // 返回上一页
  }

  const handleGoHome = () => {
    navigate('/') // 返回首页
  }

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
        404
      </h1>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
        页面未找到
      </h2>
      <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
        抱歉，您访问的页面不存在或已被移动。
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <Button
          onClick={handleGoBack}
          variant="outline"
          colorScheme="blue"
          size="lg"
          style={{ minWidth: '120px' }}
        >
          返回
        </Button>
        <Button
          onClick={handleGoHome}
          colorScheme="blue"
          size="lg"
          style={{ minWidth: '120px' }}
        >
          回到首页
        </Button>
      </div>
    </div>
  )
}