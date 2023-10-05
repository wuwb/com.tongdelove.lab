export const PricingCard = (props) => {
    return (
        <div className="flex flex-col overflow-hidden border h-full rounded-[4px]">
            <div className="dark:bg-scale-300 bg-white px-8 pt-6 rounded-tr-[4px] rounded-tl-[4px] ">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <h3 className="gradient-text-brand-500 dark:gradient-text-brand-100 text-2xl font-normal uppercase flex items-center gap-4 font-mono">Free</h3>
                    </div>
                </div>
                <p className="text-scale-1100 my-4 h-[55px] text-sm border-b dark:border-scale-500 pb-4 lg:pr-20">Perfect for passion projects &amp; simple websites.</p>
                <div className=" text-scale-1200 flex items-baseline text-5xl font-normal lg:text-4xl xl:text-4xl border-b dark:border-scale-500 pt-4 pb-8 min-h-[175px] ">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-end gap-2">
                            <div>
                                <p className="text-scale-900 ml-1 text-xs font-normal">Starting from</p>
                                <p className="mt-2 gradient-text-scale-500 dark:gradient-text-scale-100 pb-1 text-5xl">$0</p>
                                <p className="text-scale-900 mt-0.5 text-xs">per month per project</p>
                                <p className="-mt-2">
                                    <span className="bg-brand-500 text-brand-1100 rounded-md bg-opacity-30 py-0.5 px-2 text-xs ">Limit of 2 free projects</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dark:border-scale-400 dark:bg-scale-300 flex h-full rounded-bl-[4px] rounded-br-[4px] flex-1 flex-col bg-white px-8 py-6 ">
                <p className="text-scale-1100 text-xs mt-2 mb-4">Get started with:</p>
                <ul role="list" className="text-xs text-scale-1000">
                    <li className="flex items-center py-2 first:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="sbui-icon text-brand-900 h-4 w-4 " aria-hidden="true">
                            <polyline points="20 6 9 17 4 12">
                            </polyline>
                        </svg>
                        <span className="dark:text-scale-1200 mb-0 ml-3 ">Up to 500MB database &amp; 1GB file storage</span>
                    </li>
                    <li className="flex items-center py-2 first:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="sbui-icon text-brand-900 h-4 w-4 " aria-hidden="true">
                            <polyline points="20 6 9 17 4 12">
                            </polyline>
                        </svg>
                        <span className="dark:text-scale-1200 mb-0 ml-3 ">Up to 2GB bandwidth</span>
                    </li>
                    <li className="flex items-center py-2 first:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="sbui-icon text-brand-900 h-4 w-4 " aria-hidden="true">
                            <polyline points="20 6 9 17 4 12">
                            </polyline>
                        </svg>
                        <span className="dark:text-scale-1200 mb-0 ml-3 ">Up to 50MB file uploads</span>
                    </li>
                    <li className="flex items-center py-2 first:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="sbui-icon text-brand-900 h-4 w-4 " aria-hidden="true">
                            <polyline points="20 6 9 17 4 12">
                            </polyline>
                        </svg>
                        <span className="dark:text-scale-1200 mb-0 ml-3 ">Social OAuth providers</span>
                    </li>
                    <li className="flex items-center py-2 first:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="sbui-icon text-brand-900 h-4 w-4 " aria-hidden="true">
                            <polyline points="20 6 9 17 4 12">
                            </polyline>
                        </svg>
                        <span className="dark:text-scale-1200 mb-0 ml-3 ">50,000 monthly active users</span>
                    </li>
                    <li className="flex items-center py-2 first:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="sbui-icon text-brand-900 h-4 w-4 " aria-hidden="true">
                            <polyline points="20 6 9 17 4 12">
                            </polyline>
                        </svg>
                        <span className="dark:text-scale-1200 mb-0 ml-3 ">Up to 500K Edge Function invocations</span>
                    </li>
                    <li className="flex items-center py-2 first:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="sbui-icon text-brand-900 h-4 w-4 " aria-hidden="true">
                            <polyline points="20 6 9 17 4 12">
                            </polyline>
                        </svg>
                        <span className="dark:text-scale-1200 mb-0 ml-3 ">1-day log retention</span>
                    </li>
                    <li className="flex items-center py-2 first:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="sbui-icon text-brand-900 h-4 w-4 " aria-hidden="true">
                            <polyline points="20 6 9 17 4 12">
                            </polyline>
                        </svg>
                        <span className="dark:text-scale-1200 mb-0 ml-3 ">Community support</span>
                    </li>
                </ul>
                <div className="flex flex-col gap-6 mt-auto prose">
                    <div className="space-y-2 mt-12">
                        <p className="text-xs">Free projects are paused after 1 week of inactivity.</p>
                    </div>
                    <a href="https://app.supabase.com/new/new-project">
                        <button className=" relative cursor-pointer inline-flex items-center space-x-2 text-center font-regular transition ease-out duration-200 rounded outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1   bg-brand-fixed-1100 hover:bg-brand-fixed-1000 text-white bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600  w-full flex items-center justify-center shadow-sm text-sm leading-4 px-3 py-2" type="button">
                            <span className="truncate">Get Started</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}
