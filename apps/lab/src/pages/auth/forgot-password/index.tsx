import { Link } from '@/components/ui/Link'
import Image from 'next/image'

const ForgotPassword = () => {
  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-12">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <Image src="/images/placeholder/1010x727" className="w-full" alt="Phone image" width="1010" height="727" />
          </div>
          <div className="md:w-8/12 lg:ml-20 lg:w-5/12">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">重置密码</h2>
            </div>

            <form>
              <div className="mb-6">
                <label htmlFor="email">邮箱</label>
                <input
                  id="email"
                  placeholder="邮箱"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                />
                <p>24 小时内，至多可以重新设置密码 2 次。</p>
              </div>
              <div>
                <p>你是机器人么？</p>
                <p>请输入上图中的验证码</p>
              </div>
              <button className="inline-block w-full rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
                发送重置密码邮件
              </button>
              登录
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
