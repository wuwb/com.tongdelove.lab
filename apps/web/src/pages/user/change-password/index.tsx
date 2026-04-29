import React from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toaster'
import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/field'

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

class ChangePassword extends React.Component<any, any> {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let { newPassword, confirmPassword, password } = values
        if (newPassword !== confirmPassword) {
          toast.error('新密码与确认密码不一致')
          return
        }

        let params = {
          password,
          newPassword,
        }

        // let response = await API.updatePersonalInfo(params);

        // notification['success']({
        //   message: response.message,
        // });
        console.log('Received values of form: ', values)
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

  render() {
    return (
      <section className="m-10">
        <div>
          <Field
            {...formItemLayout}
            label={<span className="form-item-label">旧密码</span>}
          >
            <Input />
          </Field>
          <Field
            {...formItemLayout}
            label={<span className="form-item-label">新密码</span>}
          >
            <Input />
          </Field>
          <Field
            {...formItemLayout}
            label={<span className="form-item-label">确定新密码</span>}
          >
            <Input />
          </Field>
          <Field {...tailFormItemLayout}>
            <Button type="submit">确定</Button>
          </Field>
        </div>
      </section>
    )
  }
}

export default ChangePassword
