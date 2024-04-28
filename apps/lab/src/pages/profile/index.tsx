import { useAuth } from '@/contexts/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tongdelove/ui/tabs'
import { Separator } from '@tongdelove/ui/separator'

function ProfilePage(): any {
  const { user } = useAuth()

  return (
    <div className="box max-w-screen-3xl container mx-auto w-full max-w-[1680px]">
      <div className="my-6 space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">设置</h2>
        <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <a
              className="inline-flex h-9 items-center justify-start whitespace-nowrap rounded-md bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="/examples/forms"
            >
              资料
            </a>
            <a
              className="inline-flex h-9 items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent hover:text-accent-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="/examples/forms/account"
            >
              账号
            </a>
            <a
              className="inline-flex h-9 items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent hover:text-accent-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="/examples/forms/appearance"
            >
              积分
            </a>
            <a
              className="inline-flex h-9 items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent hover:text-accent-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="/examples/forms/appearance"
            >
              记录
            </a>
            <a
              className="inline-flex h-9 items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent hover:text-accent-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="/examples/forms/appearance"
            >
              邀请
            </a>
            <a
              className="inline-flex h-9 items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent hover:text-accent-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="/examples/forms/appearance"
            >
              Appearance
            </a>
            <a
              className="inline-flex h-9 items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent hover:text-accent-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="/examples/forms/notifications"
            >
              Notifications
            </a>
            <a
              className="inline-flex h-9 items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent hover:text-accent-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="/examples/forms/display"
            >
              Display
            </a>
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
            </div>

            <Separator />
          </div>
          <form className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for=":rhk:-form-item">
                Username
              </label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="shadcn"
                id=":rhk:-form-item"
                aria-describedby=":rhk:-form-item-description"
                aria-invalid="false"
                name="username"
              />
              <p id=":rhk:-form-item-description" className="text-[0.8rem] text-muted-foreground">
                This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for=":rhl:-form-item">
                Email
              </label>
              <button
                type="button"
                role="combobox"
                aria-controls="radix-:rhm:"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                data-placeholder=""
                className="[&amp;>span]:line-clamp-1 flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id=":rhl:-form-item"
                aria-describedby=":rhl:-form-item-description"
                aria-invalid="false"
              >
                <span>Select a verified email to display</span>
              </button>
              <select aria-hidden="true" tabindex="-1">
                <option value=""></option>
                <option value="m@example.com">m@example.com</option>
              </select>
              <p id=":rhl:-form-item-description" className="text-[0.8rem] text-muted-foreground">
                You can manage verified email addresses in your <a href="/examples/forms">email settings</a>.
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for=":rhn:-form-item">
                Bio
              </label>
              <textarea
                className="flex min-h-[60px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell us a little bit about yourself"
                name="bio"
                id=":rhn:-form-item"
                aria-describedby=":rhn:-form-item-description"
                aria-invalid="false"
              >
                I own a computer.
              </textarea>
              <p id=":rhn:-form-item-description" className="text-[0.8rem] text-muted-foreground">
                You can <span>@mention</span> other users and organizations to link to them.
              </p>
            </div>
            <div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for=":rho:-form-item">
                  URLs
                </label>
                <p id=":rho:-form-item-description" className="text-[0.8rem] text-muted-foreground">
                  Add links to your website, blog, or social media profiles.
                </p>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  id=":rho:-form-item"
                  aria-describedby=":rho:-form-item-description"
                  aria-invalid="false"
                  value="https://shadcn.com"
                  name="urls.0.value"
                />
              </div>
              <div className="space-y-2">
                <label className="sr-only text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for=":rhp:-form-item">
                  URLs
                </label>
                <p id=":rhp:-form-item-description" className="sr-only text-[0.8rem] text-muted-foreground">
                  Add links to your website, blog, or social media profiles.
                </p>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  id=":rhp:-form-item"
                  aria-describedby=":rhp:-form-item-description"
                  aria-invalid="false"
                  value="http://twitter.com/shadcn"
                  name="urls.1.value"
                />
              </div>
              <button
                className="mt-2 inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                type="button"
              >
                Add URL
              </button>
            </div>
            <button
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              type="submit"
            >
              Update profile
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
