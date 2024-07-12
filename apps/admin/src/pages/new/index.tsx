import { BoxCell, BoxInner, BoxWrap, NewTips } from '@/components/Sider'
import { basicSetup } from '@codemirror/basic-setup'
import { markdown } from '@codemirror/lang-markdown'
import { EditorState } from '@codemirror/state'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { Button, Input, Layout, Space } from 'antd'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Styles from './index.less'

const { TextArea } = Input

const NewPage = () => {
  const editor = useRef()
  const [cacheContent, setCacheContent] = useState(``)
  const [preview, setPreview] = useState(``)
  const state = EditorState.create({
    doc: preview,
    extensions: [
      basicSetup,
      markdown(),
      EditorView.updateListener.of((v: ViewUpdate) => {
        if (v.docChanged) {
          // Document changed
          setCacheContent(v.state.doc.text.join('\n'))
        }
      }),
      EditorView.theme({
        '.cm-content, .cm-gutter': { minHeight: '200px' },
      }),
    ],
  })

  useEffect(() => {
    // const log = (event) => {
    //   console.log(event);
    // };
    // editor.current.addEventListener('input', log);

    const view = new EditorView({
      state,
      parent: editor.current,
    })

    return () => {
      view.destroy()
      //   editor.current.removeEventListener('input', log);
    }
  }, [])

  const handlePreview = () => {
    setPreview(cacheContent)
  }

  return (
    <Layout.Content>
      <div className={Styles.content}>
        <div className={Styles.main}>
          <BoxWrap>
            <BoxCell className={Styles.pageTitle}>创作新主题</BoxCell>
            <div className={Styles.editBox}>
              <BoxCell className={Styles.titleLabel}>主题标题</BoxCell>
              <BoxCell className={Styles.titleInput} style={{ padding: 0 }}>
                <TextArea
                  placeholder="请输入主题标题，如果标题能够表达完整内容，则正文可以为空"
                  autoSize
                  maxLength={120}
                />
              </BoxCell>
              <BoxCell className={Styles.contentLabel}>正文</BoxCell>
              <div className={Styles.contentInput}>
                <div ref={editor}></div>
              </div>
            </div>
            <BoxCell>选择分类</BoxCell>
            <BoxCell>热门节点：</BoxCell>
            <BoxCell>推广内容只能发布到 推广 节点</BoxCell>
            <BoxCell className={Styles.actionBar}>
              <Space>
                <Button onClick={handlePreview}>预览</Button>
                <Button>发布</Button>
              </Space>
            </BoxCell>
            {preview && preview !== '' ? (
              <BoxInner>
                <ReactMarkdown>{preview}</ReactMarkdown>
              </BoxInner>
            ) : null}
          </BoxWrap>
        </div>
        <div className={Styles.sider}>
          <NewTips />
        </div>
      </div>
    </Layout.Content>
  )
}

export default NewPage
