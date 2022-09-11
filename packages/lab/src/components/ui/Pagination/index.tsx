import { Link } from '@/components/ui/Link';

type Props = {
    postsPerPage: number;
    totalPosts: number;
    paginatePrev: Function;
    paginateNext: Function;
    handleTo: Function;
    currentPage: number;
}

export const Pagination = ({
    postsPerPage,
    totalPosts,
    paginatePrev,
    paginateNext,
    handleTo,
    currentPage,
}: Props) => {
    // 数量为 0 的时候不返回。
    if (totalPosts === 0) {
        return null;
    }
    const PageNum = Math.ceil(totalPosts / postsPerPage);
    let pageNumbers = [...Array(PageNum + 1).keys()];
    pageNumbers.shift();
    return (
        <div className='py-2'>
            <div>
                <p className='text-sm text-gray-700'>
                    Showing
                    <span className='font-medium'>{currentPage * postsPerPage - 10 + 1}</span>
                    to
                    <span className='font-medium'> {currentPage * postsPerPage} </span>
                    of
                    <span className='font-medium'> {totalPosts} </span>
                    results
                </p>
            </div>
            <nav className='block'>
                <ul className='flex pl-0 rounded list-none flex-wrap'>
                    <li>
                        {pageNumbers.map((number) => (
                            <Link
                                key={number}
                                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                    event.preventDefault();
                                    handleTo(number);
                                }}
                                href="/#"
                                className={
                                    currentPage === number
                                        ? "bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                }
                            >
                                {number}
                            </Link>
                        ))}
                    </li>
                </ul>
            </nav>
            <div>
                <nav
                    className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                    aria-label='Pagination'
                >
                    <a
                        onClick={(event) => {
                            event.preventDefault();
                            paginatePrev();
                        }}
                        href='#'
                        className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                        <span>Previous</span>
                    </a>
                    <a
                        onClick={(event) => {
                            event.preventDefault();
                            paginateNext();
                        }}
                        href='#'
                        className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                        <span>Next</span>
                    </a>
                </nav>
            </div>
        </div>
    );
}

