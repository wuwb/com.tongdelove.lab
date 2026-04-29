import { useState, useEffect } from 'react'
import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@tongdelove/ui/components/progress'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover'

import Link from 'next/link'
import styles from './register.module.css'

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
}

const passwordProgressMap: {
  ok: 'success'
  pass: 'normal'
  poor: 'exception'
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
}

const UserRegisterPage = (props) => {
  const [count, setCount]: [number, any] = useState(0)
  const [visible, setVisible]: [boolean, any] = useState(false)
  const [prefix, setPrefix]: [string, any] = useState('86')
  const [popover, setPopover]: [boolean, any] = useState(false)
  const confirmDirty = false
  let interval: number | undefined

  // const [form] = Form.useForm()

  useEffect(
    () => () => {
      clearInterval(interval)
    },
    [interval]
  )

  const onGetCaptcha = () => {
    let counts = 59
    setCount(counts)
    interval = window.setInterval(() => {
      counts -= 1
      setCount(counts)
      if (counts === 0) {
        clearInterval(interval)
      }
    }, 1000)
  }

  const getPasswordStatus = () => {
    // const value = form.getFieldValue('password')
    // if (value && value.length > 9) {
    //   return 'ok'
    // }
    // if (value && value.length > 5) {
    //   return 'pass'
    // }
    // return 'poor'
  }

  const onFinish = (values: any) => {}

  const checkConfirm = (_: any, value: string) => {
    // const promise = Promise
    // if (value && value !== form.getFieldValue('password')) {
    //   return promise.reject('两次输入的密码不匹配!')
    // }
    // return promise.resolve()
  }

  const checkPassword = (_: any, value: string) => {
    const promise = Promise
    // 没有值的情况
    if (!value) {
      setVisible(!!value)
      return promise.reject('请输入密码!')
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value)
    }
    setPopover(!popover)
    if (value.length < 6) {
      return promise.reject('')
    }
    if (value && confirmDirty) {
      // form.validateFields(['confirm'])
    }
    return promise.resolve()
  }

  const changePrefix = (value: string) => {
    setPrefix(value)
  }

  const renderPasswordProgress = () => {
    // const value = form.getFieldValue('password')
    // const passwordStatus = getPasswordStatus()
    // return value && value.length ? (
    //   <div className={styles[`progress-${passwordStatus}`]}>
    //     <ProgressRoot
    //       size="sm"
    //       // status={passwordProgressMap[passwordStatus]}
    //       className={styles.progress}
    //       value={value.length * 10 > 100 ? 100 : value.length * 10}
    //     // showInfo={false}
    //     >
    //       <ProgressBar />
    //     </ProgressRoot>
    //   </div>
    // ) : null
  }

  function submitting() {
    return false
  }

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            注册账号
          </h2>
          <p>系统暂不开放注册。</p>
          <p>体验可以联系管理员微信：13735851501</p>
        </div>
        <div
        // onFinish={onFinish}
        >
          <Field
            label="邮箱"
            // rules={[
            //   {
            //     required: true,
            //     message: '请输入邮箱地址!',
            //   },
            //   {
            //     type: 'email',
            //     message: '邮箱地址格式错误!',
            //   },
            // ]}
          >
            <Input placeholder="邮箱" />
          </Field>
          <PopoverRoot>
            <PopoverTrigger asChild>
              <Field
                label="密码"
                // rules={[
                //   {
                //     validator: checkPassword,
                //     required: true,
                //   },
                // ]}
              >
                <Input type="password" placeholder="至少6位密码，区分大小写" />
              </Field>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                <div>
                  <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                </div>
              </div>
            </PopoverContent>
          </PopoverRoot>
          <Field
            label="确认密码"
            // rules={[
            //   {
            //     required: true,
            //     message: '确认密码',
            //   },
            //   {
            //     validator: checkConfirm,
            //   },
            // ]}
          >
            <Input type="password" placeholder="确认密码" />
          </Field>
          <Field
            label="手机号"
            // rules={[
            //   {
            //     required: true,
            //     message: '请输入手机号!',
            //   },
            //   {
            //     pattern: /^\d{11}$/,
            //     message: '手机号格式错误!',
            //   },
            // ]}
          >
            <div className="flex space-x-2">
              <select className="border-input h-9 w-24 rounded-md border bg-transparent px-2 text-sm">
                <option value="86">+86</option>
              </select>
              <Input placeholder="手机号" />
            </div>
          </Field>
          <Field label="captcha" className="flex justify-start">
            <div className="flex justify-start space-x-2">
              <Input placeholder="验证码" />
              <Button
                disabled={!!count}
                className={styles.getCaptcha}
                onClick={onGetCaptcha}
              >
                {count ? `${count} s` : '获取验证码'}
              </Button>
            </div>
          </Field>

          <Field>
            <Button className="w-full" type="submit">
              <span>注册</span>
            </Button>
          </Field>
          <Field>
            <div className="flex items-center justify-between">
              <Link href="/user/forget">忘记密码了</Link>
              <Link href="/user/login">使用已有账户登录</Link>
            </div>
          </Field>
        </div>
      </div>
    </div>
  )
}

export default UserRegisterPage
