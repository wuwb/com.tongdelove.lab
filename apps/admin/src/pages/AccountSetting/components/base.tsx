import { UploadOutlined } from '@ant-design/icons'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Button, Form, Input, message, Select, Upload } from 'antd'
import { CurrentUser } from '../data.d'
import styles from './BaseView.less'
import GeographicView from './GeographicView'
import PhoneView from './PhoneView'

const { Option } = Select

const DEFAULT_AVATAR =
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => {
  return (
    <>
      <div className={styles['avatar-title']}>
        <FormattedMessage
          id="accountsettings.basic.avatar"
          defaultMessage="Avatar"
        />
      </div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload showUploadList={false}>
        <div className={styles['button-view']}>
          <Button>
            <UploadOutlined />
            <FormattedMessage
              id="accountsettings.basic.change-avatar"
              defaultMessage="Change avatar"
            />
          </Button>
        </div>
      </Upload>
    </>
  )
}

interface SelectItem {
  label: string
  key: string
}

const validatorGeographic = (
  _: any,
  value: {
    province: SelectItem
    city: SelectItem
  },
  callback: (message?: string) => void,
) => {
  const { province, city } = value
  if (!province.key) {
    callback('Please input your province!')
  }
  if (!city.key) {
    callback('Please input your city!')
  }
  callback()
}

const validatorPhone = (
  rule: any,
  value: string,
  callback: (message?: string) => void,
) => {
  const values = value.split('-')
  if (!values[0]) {
    callback('Please input your area code!')
  }
  if (!values[1]) {
    callback('Please input your phone number!')
  }
  callback()
}

interface BaseViewProps {
  currentUser?: Partial<CurrentUser>
}

const BaseView = ({ currentUser }: BaseViewProps) => {
  const intl = useIntl()
  const formatMessage = (id: string, defaultMessage?: string) =>
    intl.formatMessage({ id, defaultMessage })

  const handleFinish = () => {
    message.success(
      intl.formatMessage({
        id: 'accountsettings.basic.update.success',
        defaultMessage: 'Update information successfully',
      }),
    )
  }

  return (
    <div className={styles['base-view']}>
      <div className={styles.left}>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={currentUser}
          hideRequiredMark
        >
          <Form.Item
            name="email"
            label={formatMessage('accountsettings.basic.email')}
            rules={[
              {
                required: true,
                message: formatMessage('accountsettings.basic.email-message'),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label={formatMessage('accountsettings.basic.nickname')}
            rules={[
              {
                required: true,
                message: formatMessage('accountsettings.basic.nickname-message'),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="profile"
            label={formatMessage('accountsettings.basic.profile')}
            rules={[
              {
                required: true,
                message: formatMessage('accountsettings.basic.profile-message'),
              },
            ]}
          >
            <Input.TextArea
              placeholder={formatMessage(
                'accountsettings.basic.profile-placeholder',
              )}
              rows={4}
            />
          </Form.Item>
          <Form.Item
            name="country"
            label={formatMessage('accountsettings.basic.country')}
            rules={[
              {
                required: true,
                message: formatMessage('accountsettings.basic.country-message'),
              },
            ]}
          >
            <Select style={{ maxWidth: 220 }}>
              <Option value="China">中国</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="geographic"
            label={formatMessage('accountsettings.basic.geographic')}
            rules={[
              {
                required: true,
                message: formatMessage(
                  'accountsettings.basic.geographic-message',
                ),
              },
              {
                validator: validatorGeographic,
              },
            ]}
          >
            <GeographicView />
          </Form.Item>
          <Form.Item
            name="address"
            label={formatMessage('accountsettings.basic.address')}
            rules={[
              {
                required: true,
                message: formatMessage('accountsettings.basic.address-message'),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label={formatMessage('accountsettings.basic.phone')}
            rules={[
              {
                required: true,
                message: formatMessage('accountsettings.basic.phone-message'),
              },
              { validator: validatorPhone },
            ]}
          >
            <PhoneView />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              <FormattedMessage
                id="accountsettings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView avatar={currentUser?.avatar || DEFAULT_AVATAR} />
      </div>
    </div>
  )
}

export default BaseView
