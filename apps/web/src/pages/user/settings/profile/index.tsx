import React from 'react'
import { Form, Input, Select, Button, AutoComplete } from 'antd'
import { Row, Col } from 'antd'

const { TextArea } = Input
const FormItem = Form.Item
const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

export class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let params = {}
        Object.keys(values).forEach((index) => {
          if (!!values[index]) params[index] = values[index]
        })

        // let response = await API.updatePersonalInfo(params);
        // notification['success']({
        //   message: response.message,
        // });
        // console.log('Received values of form: ', values);
        // this.props.changeUserInfo(values);
      }
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult
    if (!value) {
      autoCompleteResult = []
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        (domain) => `${value}${domain}`
      )
    }
    this.setState({ autoCompleteResult })
  }

  changeAvatarCb = async (avatarUrl) => {
    let info = {
      avatarUrl,
    }
    // let response = await API.updatePersonalInfo(info);
    // notification.success({
    //   message: response.message,
    // });

    this.props.changeAvatarUrl(info)
  }

  render() {
    const { autoCompleteResult } = this.state

    const websiteOptions = autoCompleteResult.map((website) => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ))
    return (
      <section className="">
        <Row className="header">
          <Col span={8}>
            <span className="avatar fl-right" />
          </Col>
          <Col span={16} className="user_abstract">
            <div className={'username'}>username</div>
            {/* <div className={'notice'}>更换头像<Upload successCb={this.changeAvatarCb} className={'notice'} /></div> */}
          </Col>
        </Row>
        <Form onFinish={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            name={['profile', 'username']}
            label={<span className="form-item-label">姓名</span>}
            rules={[
              {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout}
            name={['profile', 'website']}
            label={<span className="form-item-label">网站</span>}
            rules={[{ required: false, message: 'Please input website!' }]}
          >
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
            >
              <Input />
            </AutoComplete>
          </FormItem>
          <FormItem
            {...formItemLayout}
            name={['profile', 'abstract']}
            label={<span className="form-item-label">个人简介</span>}
            rules={[
              {
                required: false,
                message: 'Please input your abstract!',
              },
            ]}
          >
            <TextArea
              placeholder="Please input your abstract "
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            name={['profile', 'email']}
            label={<span className="form-item-label">邮箱</span>}
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout}
            name={['profile', 'mobile']}
            label={<span className="form-item-label">手机号</span>}
            rules={[
              { required: false, message: 'Please input your phone number!' },
            ]}
          >
            <Input
              addonBefore={
                <Select style={{ width: 70 }}>
                  <Option value="86">+86</Option>
                  <Option value="87">+87</Option>
                </Select>
              }
              style={{ width: '100%' }}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            name={['profile', 'sex']}
            label={<span className="form-item-label">性别</span>}
            rules={[{ required: false, message: 'Please input your sex!' }]}
          >
            <Select>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              更新
            </Button>
          </FormItem>
        </Form>
      </section>
    )
  }
}
