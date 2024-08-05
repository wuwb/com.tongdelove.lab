import { Link } from '@/components/ui/'

export function LinksNav() {
  return (
    <div className="flex bg-white px-5 py-3 gap-2">
      <Link className="hover:text-[#ff5a00]" href="/">
        前端导航
      </Link>{' '}
      |{' '}
      <Link className="hover:text-[#ff5a00]" href="/">
        设计导航
      </Link>{' '}
      |{' '}
      <Link className="hover:text-[#ff5a00]" href="/">
        独立开发导航
      </Link>{' '}
      |
      <Link className="hover:text-[#ff5a00]" href="/">
        后端导航
      </Link>{' '}
      |{' '}
      <Link className="hover:text-[#ff5a00]" href="/">
        包装导航
      </Link>{' '}
      |
      <Link className="hover:text-[#ff5a00]" href="/">
        外包导航
      </Link>{' '}
    </div>
  )
}
