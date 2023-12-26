import { Link } from '@/components/ui/Link';
import { RegisterParams, register as registerUser } from '@/server/auth';
import { ServerError } from '@/utils/axios';
import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import Joi from 'joi';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

function Register() {
  const router = useRouter();

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.boolean().required(),
  });

  const formOptions = {
    resolver: joiResolver(schema),
  };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const { mutateAsync, isLoading } = useMutation<void, ServerError, RegisterParams>(registerUser);

  const onSubmit = async data => {
    // return userService.register(user)
    //     .then(() => {
    //         alertService.success('Registration successful', { keepAfterRouteChange: true });
    //         router.push('login');
    //     })
    //     .catch(alertService.error);
    console.log('data: ', data);
    await mutateAsync(data);

    router.push('/');
  };

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-12">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <Image src="http://iph.href.lu/1010x727" className="w-full" alt="Phone image" width="1010" height="727" />
          </div>
          <div className="md:w-8/12 lg:ml-20 lg:w-5/12">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">账号注册</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="username">用户名</label>
                <input
                  id="username"
                  {...register('username')}
                  aria-invalid={errors.username ? 'true' : 'false'}
                  placeholder="请输入用户名"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                />
                <div className="invalid-feedback">{errors.username?.message}</div>
              </div>
              <div className="mb-6">
                <label>密码</label>
                <input
                  {...register('password')}
                  type="password"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="请输密码"
                />
                <div className="invalid-feedback">{errors.password?.message}</div>
              </div>

              <div className="form-group mb-6">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  {...register('email')}
                  className={`form-control form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none ${errors.email ? 'is-invalid' : ''
                    }`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <button
                disabled={formState.isSubmitting}
                className="inline-block w-full rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              >
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Register
              </button>
              <Link href="/user/login" className="btn btn-link mt-3 block">
                {/* <Trans t={t} i18nKey="pages.user.login.register-text"> */}
                已有账号，登录
                {/* </Trans> */}
              </Link>
            </form>
            <div className="rounded-t-lg p-8">
              <p className="text-center text-sm font-light text-gray-400">使用三方账号快速注册</p>
              <div>
                <div className="mt-3 flex items-center justify-center space-x-4">
                  <button className="flex transform items-center rounded border border-transparent bg-white py-2 px-4 text-sm font-medium uppercase text-indigo-500 shadow-md transition hover:-translate-y-0.5 hover:border-transparent hover: hover:text-gray-700 hover:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="mr-3 h-6 w-6">
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      ></path>
                    </svg>
                    Github
                  </button>
                  <button className="flex transform items-center rounded border border-transparent bg-white py-2 px-4 text-sm font-medium uppercase text-indigo-500 shadow-md transition hover:-translate-y-0.5 hover:border-transparent hover: hover:text-gray-700 hover:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6" viewBox="0 0 48 48">
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
    </section>
  );
}

export default Register;
