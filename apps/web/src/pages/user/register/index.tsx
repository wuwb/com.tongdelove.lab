import { useState, useEffect } from 'react'
import { Form, Button, Input, Popover, Progress, Select } from 'antd'
import Link from 'next/link'
import styles from './register.module.css'

const { Option } = Select
const InputGroup = Input.Group

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

export const UserRegisterPage = (props) => {
  const [count, setCount]: [number, any] = useState(0)
  const [visible, setVisible]: [boolean, any] = useState(false)
  const [prefix, setPrefix]: [string, any] = useState('86')
  const [popover, setPopover]: [boolean, any] = useState(false)
  const confirmDirty = false
  let interval: number | undefined

  const [form] = Form.useForm()

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
    const value = form.getFieldValue('password')
    if (value && value.length > 9) {
      return 'ok'
    }
    if (value && value.length > 5) {
      return 'pass'
    }
    return 'poor'
  }

  const onFinish = (values: any) => {}

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!')
    }
    return promise.resolve()
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
      form.validateFields(['confirm'])
    }
    return promise.resolve()
  }

  const changePrefix = (value: string) => {
    setPrefix(value)
  }

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password')
    const passwordStatus = getPasswordStatus()
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null
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
        <Form
          form={form}
          layout="vertical"
          name="UserRegister"
          onFinish={onFinish}
        >
          <Form.Item
            name="mail"
            label="邮箱"
            rules={[
              {
                required: true,
                message: '请输入邮箱地址!',
              },
              {
                type: 'email',
                message: '邮箱地址格式错误!',
              },
            ]}
          >
            <Input placeholder="邮箱" />
          </Form.Item>
          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode as HTMLElement
              }
              return node
            }}
            content={
              visible && (
                <div>
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div>
                    <span>
                      请至少输入 6 个字符。请不要使用容易被猜到的密码。
                    </span>
                  </div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  validator: checkPassword,
                  required: true,
                },
              ]}
            >
              <Input type="password" placeholder="至少6位密码，区分大小写" />
            </Form.Item>
          </Popover>
          <Form.Item
            name="confirm"
            label="确认密码"
            rules={[
              {
                required: true,
                message: '确认密码',
              },
              {
                validator: checkConfirm,
              },
            ]}
          >
            <Input type="password" placeholder="确认密码" />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号!',
              },
              {
                pattern: /^\d{11}$/,
                message: '手机号格式错误!',
              },
            ]}
          >
            <div className="flex space-x-2">
              <Select value={prefix} onChange={changePrefix}>
                <Option value="86">+86</Option>
              </Select>
              <Input placeholder="手机号" />
            </div>
          </Form.Item>
          <Form.Item
            name="captcha"
            label="验证码"
            className="flex justify-start"
            rules={[
              {
                required: true,
                message: '请输入验证码!',
              },
            ]}
          >
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
          </Form.Item>

          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              <span>注册</span>
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-between">
              <Link href="/user/forget">忘记密码了</Link>
              <Link href="/user/login">使用已有账户登录</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
