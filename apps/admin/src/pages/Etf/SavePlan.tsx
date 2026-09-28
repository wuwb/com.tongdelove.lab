import { useState } from 'react'
import { Button, Form, Input, Modal, message } from 'antd'
import { useAppState } from './common/store'
import { createGridPlan } from '@/services/etf/gridPlan'

export function SavePlan() {
  const state = useAppState()
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form] = Form.useForm<{ name: string }>()

  const handleOpen = () => {
    form.setFieldsValue({ name: state.fundName || '' })
    setOpen(true)
  }

  const handleOk = async () => {
    const values = await form.validateFields()
    setSubmitting(true)
    try {
      await createGridPlan({
        name: values.name,
        fundName: state.fundName || undefined,
        fundCode: state.fundCode || undefined,
        config: state,
      })
      message.success('方案已保存')
      setOpen(false)
    } catch (e) {
      console.error('[SavePlan]', e)
      message.error('保存失败，请重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        保存方案
      </Button>
      <Modal
        title="保存网格交易方案"
        open={open}
        onOk={handleOk}
        confirmLoading={submitting}
        onCancel={() => setOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="方案名称"
            rules={[{ required: true, message: '请输入方案名称' }]}
          >
            <Input placeholder="请输入方案名称" maxLength={50} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default SavePlan
