import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import { useState } from 'react'

const ImportTabaoCSV = () => {
  let [param, seParam] = useState(0)

  const token = localStorage.getItem('token')

  function cal(e: any) {
    console.log(e)
    seParam(e.currentTarget.value)
  }

  const props = {
    name: 'file',
    action: '/api/taobao/upload-taobao-order-csv',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>导入淘宝订单 CSV 文件</Button>
    </Upload>
  )
}

export default ImportTabaoCSV
