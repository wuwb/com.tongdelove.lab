import { Link } from '@/components/ui2/Link'
import { useAuth } from '@/contexts/auth'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Image } from '@mantine/core'
import { useForm } from '@mantine/form'
import { getCsrfToken, signIn } from 'next-auth/react'
import { LuGithub } from "react-icons/lu"
import { FcGoogle } from "react-icons/fc"

const UserLoginPage = ({ csrfToken }: { csrfToken: string }) => {
  const router = useRouter()
  const auth = useAuth()
  const [persist, setPersist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('persist', `${persist}`)
  }, [persist])

  const form = useForm({
    initialValues: {
      csrfToken,
      email: '',
      password: '',
      persist: false,
      termsOfService: false,
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const handleSubmit = () => {
    form.onSubmit(values => {
      fetch('/api/auth/callback/credentials', {
        method: 'POST',
        body: JSON.stringify(values),
      })
      console.log('Success:', values)
      router.push('/')
    })
  }

  const handleGithubLogin = () => {
    signIn('github')
  }

  const handleGoogleLogin = () => {
    signIn('google')
  }

  return (
    <>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email address
          <input type="email" id="email" name="email" />
        </label>
        <button type="submit">Sign in with Email</button>
      </form>
      <div className="container px-6 py-12">
        <div className="g-6 flex flex-wrap items-center justify-center text-gray-800">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <Image src="/images/placeholder/1010x727" className="w-full" alt="Phone image" width="1010" height="727" />
          </div>
          <div className="md:w-8/12 lg:ml-20 lg:w-5/12">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">账号登录</h2>
            </div>
            <form id="td_login_signin_form" onSubmit={handleSubmit}>
              <input name="csrfToken" {...form.getInputProps('csrfToken')} hidden />
              <div className="mb-6">
                <label htmlFor="identifier">用户名</label>
                <input
                  id="identifier"
                  {...form.getInputProps('identifier')}
                  aria-invalid={form.errors.identifier ? 'true' : 'false'}
                  placeholder="请输入用户名"
                  autoComplete="off"
                  className={clsx(
                    'form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none',
                    {
                      'is-invalid': form.errors.identifier,
                    },
                    {
                      'is-invalid': !form.errors.identifier,
                    }
                  )}
                />
                {form.errors.identifier && (
                  <div className="fv-plugins-message-container">
                    <span role="alert">{form.errors.identifier.message}</span>
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label>密码</label>
                <input
                  {...form.getInputProps('password')}
                  type="password"
                  autoComplete="off"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="请输密码"
                />
                {form.errors.password && (
                  <div className="fv-plugins-message-container">
                    <span role="alert">{form.errors.password.message}</span>
                  </div>
                )}
              </div>

              <div className="mb-6 flex items-center">
                <div className="form-group form-check">
                  <input id="persist" type="checkbox" {...form.getInputProps('persist')} />
                  <label className="form-check-label inline-block text-gray-800" htmlFor="persist">
                    记住账号
                  </label>
                </div>
                <Link href="/user/forget">忘记密码了</Link>
              </div>

              <button
                disabled={isLoading}
                className="inline-block w-full rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              >
                {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                登录
              </button>
              <Link href="/user/register" className="btn btn-link mt-3 block">
                {/* <Trans t={t} i18nKey="pages.user.login.register-text"> */}
                注册
                {/* </Trans> */}
              </Link>
            </form>
            <div className="rounded-t-lg p-8">
              <p className="text-center text-sm font-light text-gray-400">Sign in with</p>
              <div>
                <div className="mt-3 flex items-center justify-center space-x-4">
                  <button
                    className="hover: flex transform items-center rounded border border-transparent bg-white px-4 py-2 text-sm font-medium uppercase text-indigo-500 shadow-md transition hover:-translate-y-0.5 hover:border-transparent hover:text-gray-700 hover:shadow-lg"
                    onClick={handleGithubLogin}
                  >
                    <LuGithub />
                    Github
                  </button>
                  <button
                    className="hover: flex transform items-center rounded border border-transparent bg-white px-4 py-2 text-sm font-medium uppercase text-indigo-500 shadow-md transition hover:-translate-y-0.5 hover:border-transparent hover:text-gray-700 hover:shadow-lg"
                    onClick={handleGoogleLogin}
                  >
                    <FcGoogle />
                    Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      csrfToken,
    },
  }
}

export default UserLoginPage
