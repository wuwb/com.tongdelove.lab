import { Link } from '@/components/ui2/Link'

type Props = {
  postsPerPage: number
  totalPosts: number
  paginatePrev: any
  paginateNext: any
  handleTo: any
  currentPage: number
}

export const Pagination = ({ postsPerPage, totalPosts, paginatePrev, paginateNext, handleTo, currentPage }: Props) => {
  // 数量为 0 的时候不返回。
  if (totalPosts === 0) {
    return null
  }
  const PageNum = Math.ceil(totalPosts / postsPerPage)
  const pageNumbers = Array.from({ length: PageNum }, (_, index) => index + 1)
  pageNumbers.shift()
  return (
    <div className="py-2">
      <div>
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium">{currentPage * postsPerPage - 10 + 1}</span>
          to
          <span className="font-medium"> {currentPage * postsPerPage} </span>
          of
          <span className="font-medium"> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className="block">
        <ul className="flex list-none flex-wrap rounded pl-0">
          <li>
            {pageNumbers.map(number => (
              <Link
                key={number}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault()
                  handleTo(number)
                }}
                href="/#"
                className={
                  currentPage === number
                    ? 'bg-blue relative inline-flex items-center border border-red-300 px-4 py-2 text-sm font-medium text-red-500 hover:bg-blue-200'
                    : 'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-blue-200'
                }
              >
                {number}
              </Link>
            ))}
          </li>
        </ul>
      </nav>
      <div>
        <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a
            onClick={event => {
              event.preventDefault()
              paginatePrev()
            }}
            href="#"
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span>Previous</span>
          </a>
          <a
            onClick={event => {
              event.preventDefault()
              paginateNext()
            }}
            href="#"
            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span>Next</span>
          </a>
        </nav>
      </div>
    </div>
  )
}
