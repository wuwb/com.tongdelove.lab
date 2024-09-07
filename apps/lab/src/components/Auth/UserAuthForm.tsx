import { ChangeEvent, useState } from 'react'
import { cn } from '@tongdelove/ui'
import { Button } from '@tongdelove/ui/button'
import { Input } from '@tongdelove/ui/input'
import { Label } from '@tongdelove/ui/label'
import { Loader2 } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { useSession } from 'next-auth/react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState('')

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  async function handleLogin() {
    // await signIn('email', { email })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              {t('Email')}
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              placeholder={t('name@example.com')}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleEmailChange}
            />
          </div>
          <Button disabled={isLoading} onClick={handleLogin}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('Sign In with Email')}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('Or continue with')}
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <div></div>
        )}{' '}
        {t('Github')}
      </Button>
      <button className="transform rounded border border-transparent bg-white px-4 py-2 text-sm font-medium uppercase shadow-md transition hover:flex hover:-translate-y-0.5 hover:justify-center hover:border-transparent hover:text-gray-700 hover:shadow-lg">
        {t('Google')}
      </button>
    </div>
  )
}
