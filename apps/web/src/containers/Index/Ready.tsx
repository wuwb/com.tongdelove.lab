import Link from 'next/link'

export const Ready = () => {
  return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <h3 className="text-xl">准备好让你的生产过程变得更加智能了吗？</h3>
      <Link href="/join">赶快加入我们把！</Link>
    </div>
  )
}
