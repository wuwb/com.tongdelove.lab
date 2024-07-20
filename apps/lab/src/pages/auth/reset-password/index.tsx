import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button, Input } from '@mantine/core'

const ChangePassword = () => {
  const onSubmit = (data) => {
    console.log('data: ', data)
  }

  const { register, handleSubmit, reset, control, formState } = useForm()

  return (
    <section className="m-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label className="form-item-label">旧密码</label>
          <input {...register('password')} />
        </div>
        <div className="mb-6">
          <label className="form-item-label">新密码</label>
          <input {...register('password')} />
        </div>
        <div className="mb-6">
          <label className="form-item-label">确定新密码</label>
          <input {...register('password')} />
        </div>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </form>
    </section>
  )
}

export default ChangePassword
