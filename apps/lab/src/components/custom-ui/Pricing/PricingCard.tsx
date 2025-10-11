export const PricingCard = (props) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[4px] border">
      <div className="dark:bg-scale-300 rounded-tl-[4px] rounded-tr-[4px] bg-white px-8 pt-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <h3 className="gradient-text-brand-500 dark:gradient-text-brand-100 flex items-center gap-4 font-mono text-2xl font-normal uppercase">
              Free
            </h3>
          </div>
        </div>
        <p className="text-scale-1100 dark:border-scale-500 my-4 h-[55px] border-b pb-4 text-sm lg:pr-20">
          Perfect for passion projects &amp; simple websites.
        </p>
        <div className="text-scale-1200 dark:border-scale-500 flex min-h-[175px] items-baseline border-b pb-8 pt-4 text-5xl font-normal lg:text-4xl xl:text-4xl">
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-2">
              <div>
                <p className="text-scale-900 ml-1 text-xs font-normal">
                  Starting from
                </p>
                <p className="gradient-text-scale-500 dark:gradient-text-scale-100 mt-2 pb-1 text-5xl">
                  $0
                </p>
                <p className="text-scale-900 mt-0.5 text-xs">
                  per month per project
                </p>
                <p className="-mt-2">
                  <span className="bg-brand-500 text-brand-1100 rounded-md bg-opacity-30 px-2 py-0.5 text-xs">
                    Limit of 2 free projects
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dark:border-scale-400 dark:bg-scale-300 flex h-full flex-1 flex-col rounded-bl-[4px] rounded-br-[4px] bg-white px-8 py-6">
        <p className="text-scale-1100 mb-4 mt-2 text-xs">Get started with:</p>
        <ul role="list" className="text-scale-1000 text-xs">
          <li className="flex items-center py-2 first:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sbui-icon text-brand-900 h-4 w-4"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="dark:text-scale-1200 mb-0 ml-3">
              Up to 500MB database &amp; 1GB file storage
            </span>
          </li>
          <li className="flex items-center py-2 first:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sbui-icon text-brand-900 h-4 w-4"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="dark:text-scale-1200 mb-0 ml-3">
              Up to 2GB bandwidth
            </span>
          </li>
          <li className="flex items-center py-2 first:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sbui-icon text-brand-900 h-4 w-4"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="dark:text-scale-1200 mb-0 ml-3">
              Up to 50MB file uploads
            </span>
          </li>
          <li className="flex items-center py-2 first:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sbui-icon text-brand-900 h-4 w-4"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="dark:text-scale-1200 mb-0 ml-3">
              Social OAuth providers
            </span>
          </li>
          <li className="flex items-center py-2 first:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sbui-icon text-brand-900 h-4 w-4"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="dark:text-scale-1200 mb-0 ml-3">
              50,000 monthly active users
            </span>
          </li>
          <li className="flex items-center py-2 first:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sbui-icon text-brand-900 h-4 w-4"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="dark:text-scale-1200 mb-0 ml-3">
              Up to 500K Edge Function invocations
            </span>
          </li>
          <li className="flex items-center py-2 first:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sbui-icon text-brand-900 h-4 w-4"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="dark:text-scale-1200 mb-0 ml-3">
              1-day log retention
            </span>
          </li>
          <li className="flex items-center py-2 first:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sbui-icon text-brand-900 h-4 w-4"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="dark:text-scale-1200 mb-0 ml-3">
              Community support
            </span>
          </li>
        </ul>
        <div className="prose mt-auto flex flex-col gap-6">
          <div className="mt-12 space-y-2">
            <p className="text-xs">
              Free projects are paused after 1 week of inactivity.
            </p>
          </div>
          <a href="https://app.supabase.com/new/new-project">
            <button
              className="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center justify-center space-x-2 rounded px-3 py-2 text-center text-sm leading-4 text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
              type="button"
            >
              <span className="truncate">Get Started</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
