import { Link } from '@/components/ui/Link';
import { useAuth } from '@/contexts/auth';
import { UserService } from "@/server";
import cn from 'clsx';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import { getCsrfToken } from "next-auth/react"

const UserLoginPage = ({ csrfToken }) => {
    const router = useRouter();
    const auth = useAuth();
    const [persist, setPersist] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if ((UserService as any).userValue) {
            router.push('/');
        }
    }, [router]);

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
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleSubmit = () => {
        form.onSubmit((values) => {
            fetch("/api/auth/callback/credentials", {
                method: "POST",
                body: JSON.stringify(values),
            });
            console.log('Success:', values);
            router.push('/');
        })
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
                <div className="flex justify-center items-center flex-wrap g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <Image
                            src="/images/placeholder/1010x727"
                            className="w-full"
                            alt="Phone image"
                            width="1010"
                            height="727"
                        />
                    </div>
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">账号登录</h2>
                        </div>
                        <form
                            id="td_login_signin_form"
                            onSubmit={handleSubmit}>
                            <input
                                name="csrfToken"
                                {...form.getInputProps('csrfToken')}
                                hidden
                            />
                            <div className="mb-6">
                                <label htmlFor="identifier">
                                    用户名
                                </label>
                                <input
                                    id="identifier"
                                    {...form.getInputProps('identifier')}
                                    aria-invalid={form.errors.identifier ? "true" : "false"}
                                    placeholder="请输入用户名"
                                    autoComplete='off'
                                    className={cn(
                                        "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
                                        {
                                            'is-invalid': form.errors.identifier
                                        },
                                        {
                                            'is-invalid': !form.errors.identifier
                                        }
                                    )}
                                />
                                {
                                    form.errors.identifier && (
                                        <div className='fv-plugins-message-container'>
                                            <span role='alert'>{form.errors.identifier.message}</span>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="mb-6">
                                <label>
                                    密码
                                </label>
                                <input
                                    {...form.getInputProps('password')}

                                    type="password"
                                    autoComplete='off'
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="请输密码" />
                                {
                                    form.errors.password && (
                                        <div className='fv-plugins-message-container'>
                                            <span role='alert'>{form.errors.password.message}</span>
                                        </div>
                                    )
                                }
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <div className="form-group form-check">
                                    <input id="persist" type="checkbox"
                                        {...form.getInputProps('persist')}
                                    />
                                    <label className="form-check-label inline-block text-gray-800" htmlFor="persist">
                                        记住账号
                                    </label>
                                </div>
                                <Link href="/user/forget">
                                    忘记密码了
                                </Link>
                            </div>

                            <button disabled={isLoading}
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                            >
                                {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                登录
                            </button>
                            <Link href="/user/register" className="btn btn-link block mt-3">
                                {/* <Trans t={t} i18nKey="pages.user.login.register-text"> */}
                                注册
                                {/* </Trans> */}
                            </Link>
                        </form>
                        <div className="rounded-t-lg p-8">
                            <p className="text-center text-sm text-gray-400 font-light">Sign in with</p>
                            <div>
                                <div className="flex items-center justify-center space-x-4 mt-3">
                                    <button
                                        className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover: text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            className="w-6 h-6 mr-3"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                                            ></path>
                                        </svg>
                                        Github
                                    </button>
                                    <button
                                        className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover: text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 mr-3"
                                            viewBox="0 0 48 48"
                                        >
                                            <path
                                                fill="#fbc02d"
                                                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                                            />
                                            <path
                                                fill="#e53935"
                                                d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                                            />
                                            <path
                                                fill="#4caf50"
                                                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                                            />
                                            <path
                                                fill="#1565c0"
                                                d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                                            />
                                        </svg>
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
};

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    return {
      props: {
        csrfToken
        },
    }
}


export default UserLoginPage;
