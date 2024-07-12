import { PageContainer } from '@ant-design/pro-components'
import { useParams } from '@umijs/max'
import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  message,
  Radio,
  Row,
  Space,
} from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import ReactQuill from 'react-quill' // Typescript
import 'react-quill/dist/quill.snow.css'
import { create, get } from '../service'

const { Panel } = Collapse
const { TextArea } = Input

function callback(key) {
  console.log(key)
}

const PostEditPage: React.FC<{}> = (props: any) => {
  console.log(props)
  const params: any = useParams()
  const [postData, setPostData] = useState<any>()
  const [postContent, setPostContent] = useState('')

  const fetchData = useCallback(async () => {
    const postData = await get({ id: params.id })
    console.log('postData: ', postData)
    setPostData(postData)
    // setPostContent(postData.postContent);
  }, [])

  useEffect(() => {
    fetchData().catch(console.error)
  }, [fetchData])

  const handlePostContentChange = (value: any) => {
    setPostContent(value)
  }

  const onFinish = async (values: any) => {
    console.log('Success:', values)
    values.postContent = postContent
    const result = await create(values)
    if (result.success) {
      message.success('创建成功')
    }
    console.log(result)
  }

  return (
    <PageContainer>
      <Form name="basicForm" onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col xs={18} sm={18} md={18} lg={18} xl={18}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="基本信息" key="1">
                  <Form.Item
                    name="postTitle"
                    label="标题"
                    rules={[{ required: true }]}
                  >
                    <Input value={postData?.postTitle} />
                  </Form.Item>
                  <Form.Item
                    name="postName"
                    label="Slug"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="postExcerpt"
                    label="简介"
                    rules={[{ required: false }]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Panel>
              </Collapse>
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="内容" key="1">
                  <ReactQuill
                    placeholder="请输入内容"
                    value={postContent}
                    style={{
                      height: '542px',
                    }}
                    onChange={handlePostContentChange}
                  >
                    <div
                      className="my-editing-area"
                      style={{
                        height: '500px',
                      }}
                    />
                  </ReactQuill>
                </Panel>
              </Collapse>
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="SEO Meta" key="1">
                  <Form.Item
                    name="seoTitle"
                    label="标题"
                    rules={[{ required: false }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="seoKeyword"
                    label="关键词"
                    rules={[{ required: false }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="seoDesc"
                    label="描述"
                    rules={[{ required: false }]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Panel>
              </Collapse>
            </Space>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="发布" key="1">
                  <Form.Item
                    name="order"
                    label="顺序"
                    rules={[{ required: false }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="category"
                    label="分类"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="tag"
                    label="标签"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="addon"
                    label="附加属性"
                    rules={[{ required: false }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="publish"
                    label="发布"
                    rules={[{ required: false }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      保存
                    </Button>
                  </Form.Item>
                </Panel>
              </Collapse>
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="分类目录" key="1">
                  <Form.Item name="radio-group" label="Radio.Group">
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value={1}>Option A</Radio>
                        <Radio value={2}>Option B</Radio>
                        <Radio value={3}>Option C</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Panel>
              </Collapse>
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="Media" key="1">
                  <Form.Item
                    name="media"
                    label="图片"
                    rules={[{ required: false }]}
                  >
                    <Input />
                  </Form.Item>
                </Panel>
              </Collapse>
            </Space>
          </Col>
        </Row>
      </Form>
    </PageContainer>
  )
}

export default PostEditPage
