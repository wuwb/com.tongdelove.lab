import Link from 'next/link'

function Forget() {
  return (
    <div>
      通过电子邮件重设密码 用户名 注册邮箱 你是机器人么？ 请输入上图中的验证码 24 小时内，至多可以重新设置密码 2 次。
      <Link href="/user/register">现在注册</Link>
    </div>
  )
}

export default Forget
