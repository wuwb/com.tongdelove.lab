import { Button, Checkbox, Form, Input, notification } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export const Signup = (props) => {
  const getUserinfo = () => {
    API.getUserInfo().then((response) => {
      store.dispatch({
        type: 'ADD_USERINFO',
        info: response.data,
      })
    })
  }

  const onFinish = async (values) => {
    console.log('Success:', values)
    console.log('Received values of form: ', values)

    let response = await API.login(values)
    notification['success']({
      message: response.message,
    })

    // 登录成功后，获取用户基础数据
    getUserinfo()

    const { history } = props

    // 跳转登录
    setTimeout(() => {
      history.push('/')
    }, 500)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      {...layout}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout} valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
