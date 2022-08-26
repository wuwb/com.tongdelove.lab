import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'next-i18next'

const HomeCrumb = () => {
  const { t } = useTranslation()

  return (
    <Link href="/">
      <a className="flex items-center">
        <HomeIcon className="h-3 w-3" />
        <span className="ml-2 font-medium">{t('Home')}</span>
      </a>
    </Link>
  )
}

export const Breadcrumb: React.FC<{ query?: any }> = ({ query }) => {
  if (query) {
    const { path } = query
    if (Array.isArray(path)) {
      // We are rendering the path in reverse, so that the browser automatically scrolls to the end of the breadcrumb
      // https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up/18614561
      return (
        <ol className="no-scrollbar inline-flex flex-row-reverse items-center gap-1 overflow-x-scroll text-sm text-gray-600 dark:text-gray-300 md:gap-3">
          {path
            .slice(0)
            .reverse()
            .map((p: string, i: number) => (
              <li key={i} className="flex flex-shrink-0 items-center">
                <ChevronRightIcon className="h-3 w-3" />
                <Link
                  href={`/${path
                    .slice(0, path.length - i)
                    .map(p => encodeURIComponent(p))
                    .join('/')}`}
                  passHref
                >
                  <a
                    className={`ml-1 transition-all duration-75 hover:opacity-70 md:ml-3 ${i == 0 && 'pointer-events-none opacity-80'
                      }`}
                  >
                    {p}
                  </a>
                </Link>
              </li>
            ))}
          <li className="flex-shrink-0 transition-all duration-75 hover:opacity-80">
            <HomeCrumb />
          </li>
        </ol>
      )
    }
  }

  return (
    <div className="text-sm text-gray-600 transition-all duration-75 hover:opacity-80 dark:text-gray-300">
      <HomeCrumb />
    </div>
  )
}
