import { useSession } from 'next-auth/react'
import { TextAvatar } from '@/components/avatar/TextAvatar'
import { useTranslation } from '@/i18n'

export const AdminSidebar = async () => {
  const { t } = useTranslation()
  // @todo better to use middleware or https://next-auth.js.org/getting-started/client#custom-client-session-handling
  const { data: session, update } = useSession()

  const user = session?.user

  return (
    <div className="flex flex-row sm:gap-10">
      <div className="sm:w-full sm:max-w-[18rem]">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          className="sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay"
        ></label>
        <aside className="sidebar sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full">
          <section className="sidebar-title items-center p-4">
            <div className="flex flex-col">
              <span>{t('tongdelove')}</span>
              <span className="text-content2 text-xs font-normal">
                Team Plan
              </span>
            </div>
          </section>
          <section className="sidebar-content">
            <nav className="menu rounded-md">
              <section className="menu-section px-4">
                <span className="menu-title">Main menu</span>
                <ul className="menu-items">
                  <li className="menu-item">
                    <span>General</span>
                  </li>

                  <li className="menu-active menu-item">
                    <span>Teams</span>
                  </li>
                  <li className="menu-item">
                    <span>Billing</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="menu-1"
                      className="menu-toggle"
                    />
                    <label
                      className="menu-item justify-between"
                      htmlFor="menu-1"
                    >
                      <div className="flex gap-2">
                        <span>Account</span>
                      </div>

                      <span className="menu-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </label>

                    <div className="menu-item-collapse">
                      <div className="min-h-0">
                        <label className="menu-item menu-item-disabled ml-6">
                          Change Email
                        </label>
                        <label className="menu-item ml-6">Profile</label>
                        <label className="menu-item ml-6">
                          Change Password
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
              <div className="divider my-0"></div>
              <section className="menu-section px-4">
                <span className="menu-title">Settings</span>
                <ul className="menu-items">
                  <li className="menu-item">Payments</li>
                  <li className="menu-item">Balances</li>
                  <li className="menu-item">Customers</li>
                  <li className="menu-item">Products</li>
                  <li>
                    <input
                      type="checkbox"
                      id="menu-2"
                      className="menu-toggle"
                    />
                    <label
                      className="menu-item justify-between"
                      htmlFor="menu-2"
                    >
                      <div className="flex gap-2">
                        <span>Contracts</span>
                      </div>

                      <span className="menu-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </label>

                    <div className="menu-item-collapse">
                      <div className="min-h-0">
                        <label className="menu-item menu-item-disabled ml-6">
                          Create contract
                        </label>
                        <label className="menu-item ml-6">All contracts</label>
                        <label className="menu-item ml-6">
                          Pending contracts
                        </label>
                        <label className="menu-item ml-6">Security</label>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
            </nav>
          </section>
          <section className="sidebar-footer bg-gray-2 justify-end pt-2">
            <div className="divider my-0"></div>
            <div className="dropdown hover:bg-gray-4 z-50 flex h-fit w-full cursor-pointer">
              <label className="whites hover:bg-gray-4 mx-2 flex h-fit w-full cursor-pointer p-0">
                <div className="flex flex-row gap-4 p-4">
                  <div className="avatar-square avatar avatar-md">
                    {user !== undefined ? (
                      <TextAvatar name={user.name ?? 'Demo User'} />
                    ) : null}
                    {/* <img src={user?.image ?? } alt="avatar" /> */}
                  </div>

                  <div className="flex flex-col">
                    <span>
                      {user?.name} {user?.email}
                    </span>
                  </div>
                </div>
              </label>
              <div className="dropdown-menu dropdown-menu-right-top ml-2">
                <a className="dropdown-item text-sm">Profile</a>
                <a tabIndex={-1} className="dropdown-item text-sm">
                  Account settings
                </a>
                <a tabIndex={-1} className="dropdown-item text-sm">
                  Change email
                </a>
                <a tabIndex={-1} className="dropdown-item text-sm">
                  Subscriptions
                </a>
                <a tabIndex={-1} className="dropdown-item text-sm">
                  Change password
                </a>
                <a tabIndex={-1} className="dropdown-item text-sm">
                  Refer a friend
                </a>
                <a tabIndex={-1} className="dropdown-item text-sm">
                  Settings
                </a>
              </div>
            </div>
          </section>
        </aside>
      </div>
      <div className="flex w-full flex-col p-4">
        <div className="w-fit">
          <label
            htmlFor="sidebar-mobile-fixed"
            className="btn btn-primary sm:hidden"
          >
            Open Sidebar
          </label>
        </div>

        <div className="my-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-1 flex h-40 w-full items-center justify-center border-2 border-dashed border-border">
            +
          </div>

          <div className="bg-gray-1 flex h-40 w-full items-center justify-center border-2 border-dashed border-border">
            +
          </div>
          <div className="bg-gray-1 flex h-40 w-full items-center justify-center border-2 border-dashed border-border">
            +
          </div>
          <div className="bg-gray-1 flex h-40 w-full items-center justify-center border-2 border-dashed border-border">
            +
          </div>
          <div className="bg-gray-1 flex h-40 w-full items-center justify-center border-2 border-dashed border-border">
            +
          </div>
          <div className="bg-gray-1 flex h-40 w-full items-center justify-center border-2 border-dashed border-border">
            +
          </div>
          <div className="bg-gray-1 flex h-40 w-full items-center justify-center border-2 border-dashed border-border">
            +
          </div>
          <div className="bg-gray-1 flex h-40 w-full items-center justify-center border-2 border-dashed border-border">
            +
          </div>
          <div className="bg-gray-1 flex h-40 w-full items-center justify-center border-2 border-dashed border-border">
            +
          </div>
          <div className="bg-gray-1 flex h-40 w-full items-center justify-center border-2 border-dashed border-border">
            +
          </div>
        </div>
      </div>
    </div>
  )
}
