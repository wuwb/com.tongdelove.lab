import Image from 'next/legacy/image'
import { Container } from '@/components/common'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000
const KILO_BYTES_PER_BYTE = 1000
const COUNT = 1
const FORMATS = ['jpg', 'png']

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE)

const ToolAvatarPage = (props) => {
  const fileInputField = useRef(null)
  const [files, setFiles] = useState(null)
  const multiple = true
  const drop = useRef<HTMLDivElement>(null)
  const drag = useRef(null)
  const avatarRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [message, setMessage] = useState({
    show: false,
    text: null,
    type: null,
  })

  const [value, setValue] = useState('1') // tab index
  const [item, setItem] = useState(null)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    // useRef 的 drop.current 取代了 ref 的 this.drop
    drop.current.addEventListener('dragover', handleDragOver)
    drop.current.addEventListener('drop', handleDrop)
    drop.current.addEventListener('dragenter', handleDragEnter)
    drop.current.addEventListener('dragleave', handleDragLeave)
    return () => {
      drop.current.removeEventListener('dragover', handleDragOver)
      drop.current.removeEventListener('drop', handleDrop)
      drop.current.removeEventListener('dragenter', handleDragEnter)
      drop.current.removeEventListener('dragleave', handleDragLeave)
    }
  })

  const handleUploadBtnClick = () => {
    fileInputField.current.click()
  }

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target
    if (newFiles.length) {
      const updatedFiles = addNewFiles(newFiles)
      setFiles(updatedFiles)
      callUpdateFilesCb(updatedFiles)
    }
  }

  const addNewFiles = (newFiles) => {
    for (const file of newFiles) {
      if (file.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
        if (!multiple) {
          return { file }
        }
        files[file.name] = file
      }
    }
    return { ...files }
  }

  const convertNestedObjectToArray = (nestedObj) => {
    return Object.keys(nestedObj).map((key) => nestedObj[key])
  }

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files)
    // updateFilesCb(filesAsArray);
    console.log('filesAsArray: ', filesAsArray)
  }

  const removeFile = (fileName) => {
    // delete files[fileName]
    setFiles({ ...files })
    callUpdateFilesCb({ ...files })
  }

  const downloadFile = (fileName) => {
    console.log('fileName: ', fileName)
    console.log('file: ', files[fileName])
    const blobUrl = window.URL.createObjectURL(files[fileName])
    const filename = 'avatar' + '.jpg'
    const aElement = document.createElement('a')
    document.body.appendChild(aElement)
    aElement.style.display = 'none'
    aElement.href = blobUrl
    aElement.download = filename
    aElement.click()
    document.body.removeChild(aElement)
  }

  const downloadFile2 = () => {
    avatarRef.current.downloadImg()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.target !== drag.current && setDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.target === drag.current && setDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    const count = COUNT
    const formats = FORMATS
    const files = [...e.dataTransfer.files]
    if (count && count < files.length) {
      showMessage(`抱歉，每次最多只能上传${count} 文件。`, 'error', 2000)
      return
    }
    if (
      formats &&
      files.some(
        (file) =>
          !formats.some((format) =>
            file.name.toLowerCase().endsWith(format.toLowerCase())
          )
      )
    ) {
      showMessage(`只允许上传 ${formats.join(', ')}格式的文件`, 'error', 2000)
      return
    }
    if (files && files.length) {
      showMessage('成功上传！', 'success', 1000)
      console.log(files)
      setFiles(files)
      callUpdateFilesCb(files)
    }
  }

  const showMessage = (text, type, timeout) => {
    setMessage({ show: true, text, type })
    setTimeout(
      () => setMessage({ show: false, text: null, type: null }),
      timeout
    )
  }

  const handleAddItem = () => {
    // setItem('http://localhost:3000/images/avatars/1.jpg')
  }

  const handledivAddItem = (e) => {
    console.log('e:', e)
    const imageUrl = e.target['data-loaded-src']
    console.log('imageUrl', imageUrl)
    setItem(imageUrl)
  }

  return (
    <Container>
      <div aria-label="breadcrumb" className="mt-5">
        <Link color="inherit" href="/">
          工具
        </Link>
        <Link color="inherit" href="/material-ui/getting-started/installation/">
          图像类
        </Link>
        <div color="text.primary">节日头像制作</div>
      </div>

      <h5 className="mt-5">节日头像制作</h5>

      {/* 选择器 */}
      <div className="my-10 flex items-center justify-center gap-2">
        <div
          ref={drop}
          className="relative rounded border-2 border-dashed bg-gray-50"
        >
          <div
            className="flex h-80 w-80 flex-col items-center justify-center gap-1"
            data-v-bb94a89a=""
          >
            <div className="text-gray-600" data-v-bb94a89a="">
              粘贴、拖拽图片到这
            </div>
            <div className="text-gray-600" data-v-bb94a89a="">
              或者
              <a
                className="mx-0.5 inline-block rounded border border-[#D02C25] px-1 text-[#D02C25] no-underline"
                onClick={handleUploadBtnClick}
                style={{
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                选择图片
              </a>
            </div>
          </div>
        </div>
        {/* 选择器2 */}
        <div className="h-60 w-60 bg-red-200">
          {message.show && (
            <div>
              {message.text}
              <span role="img" aria-label="emoji">
                {message.type === 'error' ? <>&#128546;</> : <>&#128536;</>}
              </span>
            </div>
          )}
          {dragging && (
            <div ref={drag}>
              请放手
              <span role="img" aria-label="emoji">
                &#128541;
              </span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputField}
            onChange={handleNewFileUpload}
            title=""
            value=""
            alt=""
          />
        </div>
      </div>

      <h5 className="mt-5">文件预览</h5>

      <div className="flex space-x-5">
        {Object.keys([]).map((fileName, index) => {
          const file = files[fileName]!
          const isImageFile = file.type.split('/')[0] === 'image'
          return (
            <div key={fileName}>
              {isImageFile && (
                <>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`file preview ${index}`}
                    width="200"
                    height="200"
                  />
                  <image
                    ref={avatarRef}
                    src={URL.createObjectURL(file) ?? ''}
                    alt=""
                  />
                </>
              )}
              <div>
                <span>{file.name}</span>
                <span>{convertBytesToKB(file.size)} kb</span>
              </div>
              <div>
                <div onClick={() => removeFile(fileName)}>删除</div>
                <div onClick={() => downloadFile(fileName)}>下载</div>
                <div onClick={() => downloadFile2()}>下载</div>
              </div>
            </div>
          )
        })}
      </div>

      <div>
        <div aria-label="lab API div example">
          <div>Item One</div>
          <div>Item Two</div>
          <div>Item Three</div>
        </div>
        <div onClick={handledivAddItem}>
          <div className="space-x-2">
            <Image
              className="w-10"
              width="96"
              height="96"
              src="http://localhost:3000/images/avatars/1.jpg"
              alt=""
            />
            <Image
              className="w-10"
              width="96"
              height="96"
              src="http://localhost:3000/images/avatars/2.jpg"
              alt=""
            />
            <Image
              className="w-10"
              width="96"
              height="96"
              src="http://localhost:3000/images/avatars/3.jpg"
              alt=""
            />
            <Image
              className="w-10"
              width="96"
              height="96"
              src="http://localhost:3000/images/avatars/4.jpg"
              alt=""
            />
            <Image
              className="w-10"
              width="96"
              height="96"
              src="http://localhost:3000/images/avatars/5.jpg"
              alt=""
            />
            <Image
              className="w-10"
              width="96"
              height="96"
              src="http://localhost:3000/images/avatars/6.jpg"
              alt=""
            />
            <Image
              className="w-10"
              width="96"
              height="96"
              src="http://localhost:3000/images/avatars/7.jpg"
              alt=""
            />
            <Image
              className="w-10"
              width="96"
              height="96"
              src="http://localhost:3000/images/avatars/8.jpg"
              alt=""
            />
          </div>
          <button onClick={handleAddItem}>添加元素</button>
        </div>
        <div>Item Two</div>
        <div>Item Three</div>
      </div>
    </Container>
  )
}

export default ToolAvatarPage
