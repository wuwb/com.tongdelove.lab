import { useAppSelector } from '@/context/hooks'
import { selectState } from '@/models/workSlice'
import req from '@/utils/req'
import { uuid } from '@/utils/tool'
import { Button, Input, Modal, Tooltip } from 'antd'
import { useRouter } from 'next/router'
import QRCode from 'qrcode.react'
import React, { memo, useEffect, useRef, useState } from 'react'
import { BiChevronLeft, BiRedo } from 'react-icons/bi'

const { confirm } = Modal
const isDev = process.env.NODE_ENV === 'development'

export const HeaderComponent = memo((props) => {
  const router = useRouter()
  const state = useAppSelector(selectState)

  router.query = {}
  router.query.tid = '1'

  const { designData, clearData, undoHandler, redoHandler } = state

  const [showModalIframe, setShowModalIframe] = useState(false)
  const [showFaceModal, setShowFaceModal] = useState(false)
  const [faceUrl, setFaceUrl] = useState('')
  const iptRef = useRef(null)

  const toPreview = () => {
    localStorage.setItem('designData', JSON.stringify(designData))
    savePreview()
    setTimeout(() => {
      router.push(
        isDev
          ? `/preview?tid=${router.query.tid}`
          : `/preview?tid=${router.query.tid}`
      )
    }, 600)
  }

  const content = () => {
    const { tid } = router.query || ''
    return (
      <QRCode value={`${router.protocol}//${router.host}/preview?tid=${tid}`} />
    )
  }

  const generateFace = (type: number) => {
    // 自定义生成封面逻辑, 可以采用html2canvas 或 dom-to-image
  }

  const handleSaveTpl = () => {
    confirm({
      title: '确定要保存吗？',
      content: (
        <div>
          <div className="mb-5">
            <span>模版名称：</span>
            <Input ref={iptRef} />
          </div>
          <div className="mb-5">
            <span>封面设置：</span>
            <Button
              style={{ marginRight: '20px' }}
              onClick={() => generateFace(1)}
            >
              一键生成封面
            </Button>
            <Button size="small" onClick={() => generateFace(0)}>
              使用默认封面
            </Button>
          </div>
          <div className="mb-5">
            <span>访问链接：</span>
            <Input disabled value="暂未开放，保存之后可以在模版库中访问" />
          </div>
        </div>
      ),
      okText: '保存',
      cancelText: '取消',
      onOk() {
        let name = iptRef.current!.state.value
        req.post('/visible/tpl/save', { name, tpl: designData }).then((res) => {
          console.log(res)
        })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const useTemplate = () => {
    Modal.info({
      title: '该功能正在升级，可以关注下方公众号实时查看动态',
      content: <div style={{ textAlign: 'center' }}>测试</div>,
      okText: '客官知道啦',
    })
  }

  const deleteAll = () => {
    Modal.confirm({
      title: '确认清空画布?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        clearData()
      },
    })
  }

  const toBack = () => {
    router.push('/')
  }

  const newPage = () => {
    clearData()
    router.push(`/editor?tid=${uuid(8, 16)}`)
  }

  const savePreview = () => {
    const { tid } = router.query || ''
    req.post('/visible/preview', { tid, tpl: designData })
  }

  useEffect(() => {
    // 定义截图子页面句柄函数
    window.getFaceUrl = (url: string) => {
      setFaceUrl(url)
      setShowModalIframe(false)
    }
  }, [])

  const generatePoster = () => {
    localStorage.setItem('designData', JSON.stringify(designData))
    setShowModalIframe(true)
    setTimeout(() => {
      setShowFaceModal(true)
    }, 3600)
  }

  const handleReloadPage = () => {
    document.getElementById('previewPage')?.contentWindow.location.reload()
  }

  return (
    <>
      <div className="flex h-[52px] items-center gap-2.5 border-b px-2.5">
        <div aria-label="menu" onClick={toBack}>
          <BiChevronLeft />
        </div>
        <div>海维设计</div>
        <div className="flex gap-0.5">
          <Button onClick={handleSaveTpl} disabled={!designData.length}>
            保存
          </Button>
          <Button onClick={newPage} disabled={!designData.length}>
            新建
          </Button>
          <Button
            onClick={deleteAll}
            disabled={!designData.length}
            variant="outlined"
          >
            清空
          </Button>
          <Button onClick={undoHandler} disabled={!designData.length}>
            撤销
          </Button>
          <Button onClick={redoHandler}>重做</Button>
          <Tooltip title="一键生成海报分享图">
            <div>
              <Button onClick={generatePoster} disabled={!designData.length}>
                分享
              </Button>
            </div>
          </Tooltip>
        </div>
      </div>

      <Modal
        title="生成封面中...(长时间未反应请点右侧按钮重试)"
        open={showModalIframe}
        footer={null}
        width={414}
        closeIcon={<BiRedo />}
        destroyOnClose={true}
        onCancel={handleReloadPage}
        maskClosable={false}
      >
        <iframe
          id="previewPage"
          src={`/preview?tid=${router.query.tid}&gf=1`}
          style={{ width: '100%', border: 'none', height: '600px' }}
        ></iframe>
      </Modal>

      <Modal
        title="封面图(右键复制图片)"
        open={showFaceModal}
        footer={null}
        width={414}
        destroyOnClose={true}
        onCancel={() => setShowFaceModal(false)}
      >
        <img src={faceUrl} style={{ width: '100%' }} />
      </Modal>
    </>
  )
})
