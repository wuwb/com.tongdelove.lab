import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@tongdelove/ui/components/textarea'
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

const RegistrationForm = (props) => {
  const [confirmDirty, setConfirmDirty] = useState(false)
  const [autoCompleteResult, setAutoCompleteResult] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleConfirmBlur = (e) => {
    const value = e.target.value
    setConfirmDirty(confirmDirty || !!value)
  }

  const compareToFirstPassword = (rule, value, callback) => {
    const form = props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  const validateToNextPassword = (rule, value, callback) => {
    const form = props.form
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  const handleWebsiteChange = (value) => {
    let autoCompleteResult
    if (!value) {
      autoCompleteResult = []
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        (domain) => `${value}${domain}`
      )
    }
    setAutoCompleteResult(autoCompleteResult)
  }

  const changeAvatarCb = async (avatarUrl) => {
    let info = {
      avatarUrl,
    }
    // let response = await API.updatePersonalInfo(info);
    // notification.success({
    //   message: response.message,
    // });

    props.changeAvatarUrl(info)
  }

  const websiteOptions = autoCompleteResult.map((website) => (
    <div key={website}>{website}</div>
  ))

  return (
    <section className="">
      <div className="header">
        <div>
          <span className="avatar fl-right" />
        </div>
        <div className="user_abstract">
          <div className="username">username</div>
          {/* <div className={'notice'}>更换头像<Upload successCb={this.changeAvatarCb} className={'notice'} /></div> */}
        </div>
      </div>
      <div>
        <Field
          {...formItemLayout}
          // name={['profile', 'username']}
          // label={<span className="form-item-label">姓名</span>}
          // rules={[
          //   {
          //     required: true,
          //     message: 'Please input your username!',
          //     whitespace: true,
          //   },
          // ]}
        >
          <Input />
        </Field>
        <Field
          {...formItemLayout}
          // name={['profile', 'website']}
          label={<span className="form-item-label">网站</span>}
          // rules={[{ required: false, message: 'Please input website!' }]}
        >
          {/* <div dataSource={websiteOptions} onChange={handleWebsiteChange}>
            <Input />
          </div> */}
        </Field>
        <Field
          {...formItemLayout}
          // name={['profile', 'abstract']}
          label={<span className="form-item-label">个人简介</span>}
          // rules={[
          //   {
          //     required: false,
          //     message: 'Please input your abstract!',
          //   },
          // ]}
        >
          <Textarea
            placeholder="Please input your abstract "
            // autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Field>
        <Field
          {...formItemLayout}
          // name={['profile', 'email']}
          // label={<span className="form-item-label">邮箱</span>}
          // rules={[
          //   {
          //     type: 'email',
          //     message: 'The input is not valid E-mail!',
          //   },
          // ]}
        >
          <Input />
        </Field>
        <Field
          {...formItemLayout}
          // name={['profile', 'mobile']}
          // label={<span className="form-item-label">手机号</span>}
          // rules={[
          //   { required: false, message: 'Please input your phone number!' },
          // ]}
        >
          {/* <Input
            addonBefore={
              <NativeSelectRoot>
                <NativeSelectField placeholder="Select option">
                  <option value="86">+86</option>
                  <option value="87">+87</option>
                </NativeSelectField>
              </NativeSelectRoot>
            }
            style={{ width: '100%' }}
          /> */}
          <div className="flex space-x-2">
            <select className="border-input h-9 w-20 rounded-md border bg-transparent px-2 text-sm">
              <option value="86">+86</option>
              <option value="87">+87</option>
            </select>
            <Input placeholder="Phone number..." />
          </div>
        </Field>
        <Field
        // {...formItemLayout}
        // name={['profile', 'sex']}
        // label={<span className="form-item-label">性别</span>}
        // rules={[{ required: false, message: 'Please input your sex!' }]}
        >
          <select className="border-input h-9 rounded-md border bg-transparent px-3 text-sm">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </Field>
        <Field {...tailFormItemLayout}>
          <Button type="submit">更新</Button>
        </Field>
      </div>
    </section>
  )
}

export default RegistrationForm
