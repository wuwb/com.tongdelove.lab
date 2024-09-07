import { useForm } from '@mantine/form'
import {
  Button,
  ColorInput,
  Select,
  Slider,
  TextInput,
  Text,
} from '@mantine/core'
import { useTranslation } from '@/i18n'
import { Faq } from '@/components/Faq/Faq'
import { FollowUsOnX } from '@/components/FollowUsOnX'
import { useEffect, useRef, useState } from 'react'
import { saveAs } from 'file-saver'
import { svgToPng } from '@/utils/svg'
import JSZip from 'jszip'
import { trpc } from '@/utils/trpc'
import { useDeviceId } from '@/hooks/useDeviceId'

export const LogoSurfPage = () => {
  const { t } = useTranslation()

  const recommandColorSchemas = [
    {
      title: t('Deep blue'),
      backgroundColor: 'rgb(26, 54, 93)',
      textColor: '#ffffff',
    },
  ]

  const initialValues = {
    text: 'AI',
    size: 512,
    radius: 90,
    backgroundColor: '#975A16',
    fontFamily: 'Impact',
    fontWeight: 400,
    fontSize: 394,
    fontRotate: 0,
    textColor: '#FEFCBF',
    fineTuneVerticalPosition: 0,
    fineTuneHorizontalPosition: 0,
  }
  const [formValue, setFormValue] = useState(initialValues)
  const [rotatePoint, setRotatePoint] = useState({
    x: 150,
    y: 150,
  })
  const textRef = useRef<SVGTextElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues,
    validate: {},
    onValuesChange: (values) => {
      console.log(values)
      const formValue = form.getValues()
      setFormValue(formValue)
    },
  })

  const handleReset = () => {
    form.reset()
  }

  const faqData = [
    {
      question: t('什么是图标生成器'),
      answer: t(
        '图标生成器是一款免费的在线工具，提供文本转徽标和文本转图标生成服务。只需输入所需的文本，即可快速创建具有专业外观的徽标和图标。该工具提供广泛的自定义选项，支持多种格式，并提供即时预览，让任何人都可以轻松创建高质量的品牌资产，而无需设计经验或昂贵的软件。'
      ),
    },
    {
      question: t('什么是 favicon ?'),
      answer: t(
        '图标是与网站关联的小图标，通常显示在浏览器的地址栏、选项卡和书签中。'
      ),
    },
    {
      question: t('字体版权如何？'),
      answer: t(
        `检查每种字体的许可信息以确定其使用权非常重要。不同的字体有不同的许可条款：

某些字体可免费用于个人和商业用途。
其他字体可能可免费用于个人用途，但需要许可才能用于商业应用。
某些字体可能对修改或嵌入有限制。
示例：Impact 字体因表情包和大胆设计而广受欢迎，个人使用可免费使用。但是，商业使用通常需要购买许可证。

请务必验证所用字体的许可条款，尤其是商业项目。如有疑问，请考虑使用开源替代方案或购买适当的许可证以确保符合法律要求。
`
      ),
    },
    {
      question: t('什么是 favicon'),
      answer: t(
        '图标是与网站关联的小图标，通常显示在浏览器的地址栏、选项卡和书签中。'
      ),
    },
    {
      question: t('网站图标文本支持哪些类型的字符？'),
      answer: t(
        `我们的网站图标生成器支持多种字符，包括：

标准字母数字字符（A-Z、a-z、0-9）
特殊符号和标点符号（!@#$%^&* 等）
来自各种脚本的 Unicode 字符（例如中文、日语、阿拉伯语、西里尔文）
表情符号（😊、🚀、🌈 等）
您可以使用单个字符、多个字符，甚至可以组合不同类型的字符。但请注意，复杂或冗长的文本可能会被缩小以适合图标，这可能会影响小显示屏上的可读性。`
      ),
    },
    {
      question: t('为什么我需要不同的图标尺寸？'),
      answer: t(
        '不同的设备和平台使用不同的图标尺寸。提供多种尺寸可确保您的图标在所有设备上看起来都清晰。'
      ),
    },
    {
      question: t('如何将图标添加到我的网站？'),
      answer: t(
        '复制我们的生成器提供的 HTML 代码并将其粘贴到 HTML 文档的 <head> 部分。确保将图标文件上传到您的网络服务器。'
      ),
    },
  ]

  const handleChangeRecommandColorSchema = (data: {
    backgroundColor: string
    textColor: string
  }) => {
    form.setFieldValue('backgroundColor', data.backgroundColor)
    form.setFieldValue('textColor', data.textColor)
  }

  const generateIcon = () => {
    if (!svgRef.current) {
      throw new Error('svg not found')
    }

    return new XMLSerializer().serializeToString(svgRef.current)
  }

  const faviconGenMutation = trpc.faviconGen.create.useMutation()
  const deviceId = useDeviceId()

  const saveGenerateData = async () => {
    const data = await faviconGenMutation.mutateAsync({
      text: formValue.text,
      size: formValue.size,
      radius: formValue.radius,
      backgroundColor: formValue.backgroundColor,
      fontFamily: formValue.fontFamily,
      fontWeight: formValue.fontWeight,
      fontSize: formValue.fontSize,
      fontRotate: formValue.fontRotate,
      textColor: formValue.textColor,
      fineTuneVerticalPosition: formValue.fineTuneVerticalPosition,
      fineTuneHorizontalPosition: formValue.fineTuneHorizontalPosition,
      deviceId,
    })
    console.log('data: ', data)
  }

  const handleDownloadPNG = async () => {
    saveGenerateData()
    if (!svgRef.current || !canvasRef.current) {
      console.error('svgRef or canvasRef not found')
      return
    }

    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const pngBlob = await svgToPng(svgData, formValue.size)
    if (!pngBlob) {
      throw new Error('png blob not found')
    }
    saveAs(
      pngBlob as Blob,
      `${formValue.text}-${formValue.size}x${formValue.size}.png`
    )
  }

  const handleDownloadSVG = () => {
    saveGenerateData()
    if (!svgRef.current) {
      return
    }

    const svgContent = new XMLSerializer().serializeToString(svgRef.current)

    // 创建Blob对象
    const svgBlob = new Blob([svgContent], {
      type: 'image/svg+xml;charset=utf-8',
    })

    // 你可以在这里处理Blob对象，例如下载它

    saveAs(svgBlob, `${formValue.text}-${formValue.size}x${formValue.size}.svg`)
  }

  const createFavicon = (size: number): Promise<Blob> => {
    const svgString = generateIcon()
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          throw new Error('ctx not found.')
        }
        ctx.drawImage(img, 0, 0, size, size)
        canvas.toBlob((blob) => {
          if (!blob) {
            reject('blob not found.')
            return
          }
          resolve(blob)
        })
      }
      const encodedSvg = encodeURIComponent(svgString)
      img.src = `data:image/svg+xml;charset=utf-8,${encodedSvg}`
    })
  }

  const handleDownloadAll = async () => {
    saveGenerateData()

    const zip = new JSZip()

    if (!svgRef.current) {
      return
    }

    const svgContent = new XMLSerializer().serializeToString(svgRef.current)
    zip.file('favicon.svg', svgContent)

    const sizes = [16, 32, 180, 192, 512, 1024, 2048]
    const nameMap = {
      '180': 'apple-touch-icon.png',
    }
    for (let size of sizes) {
      const blob = await createFavicon(size)
      zip.file(nameMap[size] || `favicon-${size}x${size}.png`, blob)
    }

    const ico16 = await createFavicon(16)
    const ico32 = await createFavicon(32)
    const ico48 = await createFavicon(48)
    const icoBlob = new Blob([ico16, ico32, ico48], {
      type: 'image/x-icon',
    })
    zip.file('favicon.ico', icoBlob)

    const content = await zip.generateAsync({
      type: 'blob',
    })

    const date = new Date()
    const name = `${formValue.text}-favicons-${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}.zip`
    saveAs(content, name)
  }

  useEffect(() => {
    if (!textRef.current) {
      return
    }

    var bbox = textRef.current.getBBox()
    var centerX = bbox.x + bbox.width / 2
    var centerY = bbox.y + bbox.height / 2

    setRotatePoint({
      x: centerX,
      y: centerY,
    })
  }, [formValue])

  return (
    <div className="container">
      <div className="flex">
        <div className="w-1/2 p-5">
          <div className="border p-5">
            <div>
              <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                  withAsterisk
                  label={t('文字')}
                  key={form.key('text')}
                  {...form.getInputProps('text')}
                />
                <Text size="sm" mt="xl">
                  {t('大小')}
                </Text>
                <Slider
                  defaultValue={512}
                  min={16}
                  max={2048}
                  step={16}
                  marks={[
                    { value: 16, label: '16' },
                    { value: 32, label: '32' },
                    { value: 64, label: '64' },
                    { value: 128, label: '128' },
                    { value: 256, label: '256' },
                    { value: 512, label: '512' },
                    { value: 1024, label: '1024' },
                    { value: 2048, label: '2048' },
                  ]}
                  key={form.key('size')}
                  {...form.getInputProps('size')}
                  labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                  }}
                />

                <Text size="sm" mt="xl">
                  {t('圆角')}
                </Text>
                <Slider
                  defaultValue={90}
                  min={0}
                  max={512}
                  step={0.01}
                  key={form.key('radius')}
                  {...form.getInputProps('radius')}
                  labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                  }}
                />
                <div className="flex items-end gap-2">
                  <ColorInput
                    className="flex-1"
                    label={t('背景颜色')}
                    key={form.key('backgroundColor')}
                    {...form.getInputProps('backgroundColor')}
                  />
                  <Button>随机</Button>
                </div>
                <Select
                  data={[
                    'Arial',
                    'Helvetica',
                    'Times New Roman',
                    'Courier',
                    'Verdana',
                    'Georgia',
                    'Palatino',
                    'Garamond',
                    'Bookman',
                    'Comic Sans MS',
                    'Trebuchet MS',
                    'Arial Black',
                    'Impact',
                  ]}
                  label={t('字体')}
                  key={form.key('fontFamily')}
                  {...form.getInputProps('fontFamily')}
                />
                <Text size="sm" mt="xl">
                  {t('字重（根据浏览器和字体，不一定起效）')}
                </Text>
                <Slider
                  defaultValue={400}
                  min={100}
                  max={900}
                  step={100}
                  marks={[
                    { value: 100, label: 'Thin' },
                    { value: 200, label: 'Extra Light' },
                    { value: 300, label: 'Light' },
                    { value: 400, label: 'Normal' },
                    { value: 500, label: 'Medium' },
                    { value: 600, label: 'Semi Bold' },
                    { value: 700, label: 'Bold' },
                    { value: 800, label: 'Extra Bold' },
                    { value: 900, label: 'Black' },
                  ]}
                  key={form.key('fontWeight')}
                  {...form.getInputProps('fontWeight')}
                  labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                  }}
                />

                <div className="mt-10 flex items-end gap-2">
                  <ColorInput
                    className="flex-1"
                    label={t('文字颜色')}
                    key={form.key('textColor')}
                    {...form.getInputProps('textColor')}
                  />
                  <Button>随机</Button>
                </div>
                <Text size="sm" mt="xl">
                  {t('文字大小')}
                </Text>
                <Slider
                  defaultValue={0}
                  min={8}
                  max={1024}
                  step={1}
                  key={form.key('fontSize')}
                  {...form.getInputProps('fontSize')}
                  labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                  }}
                />
                <Text size="sm" mt="xl">
                  {t('文字旋转')}
                </Text>
                <Slider
                  defaultValue={0}
                  min={-180}
                  max={180}
                  step={0.01}
                  key={form.key('fontRotate')}
                  {...form.getInputProps('fontRotate')}
                  labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                  }}
                />

                <Text size="sm" mt="xl">
                  {t('垂直微调')}
                </Text>
                <Slider
                  defaultValue={0}
                  min={-0.3}
                  max={0.3}
                  step={0.01}
                  label={(value) => `${value * 100}%`}
                  key={form.key('fineTuneVerticalPosition')}
                  {...form.getInputProps('fineTuneVerticalPosition')}
                  labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                  }}
                />
                <Text size="sm" mt="xl">
                  {t('横向微调')}
                </Text>
                <Slider
                  defaultValue={0}
                  min={-0.3}
                  max={0.3}
                  step={0.01}
                  label={(value) => `${value * 100}%`}
                  key={form.key('fineTuneHorizontalPosition')}
                  {...form.getInputProps('fineTuneHorizontalPosition')}
                  labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                  }}
                />
                <Button onClick={handleReset}>{t('重置')}</Button>
              </form>
            </div>
            <div>
              <div>{t('推荐颜色配置')}</div>
              <div>
                {recommandColorSchemas.map((item) => {
                  return (
                    <Button
                      key={item.backgroundColor}
                      style={{
                        backgroundColor: item.backgroundColor,
                        color: item.textColor,
                      }}
                      onClick={() => handleChangeRecommandColorSchema(item)}
                    >
                      {item.title}
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-5">
          <div className="border p-5">
            <div className="grid-background p-5">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${formValue.size} ${formValue.size}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width={formValue.size}
                  height={formValue.size}
                  fill={formValue.backgroundColor}
                  rx={formValue.radius}
                  ry={formValue.radius}
                ></rect>
                <text
                  ref={textRef}
                  x="50%"
                  y="50%"
                  dominantBaseline="central"
                  textAnchor="middle"
                  fontFamily={formValue.fontFamily}
                  fontWeight={formValue.fontWeight}
                  fill={formValue.textColor}
                  fontSize={formValue.fontSize}
                  transform={`rotate(${formValue.fontRotate}, ${rotatePoint.x}, ${rotatePoint.y})`}
                  dx={formValue.fineTuneHorizontalPosition * 512}
                  dy={formValue.fineTuneVerticalPosition * 512}
                >
                  {formValue.text}
                </text>
              </svg>
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            <div className="mt-2.5 flex justify-center gap-2">
              <Button onClick={handleDownloadPNG}>{t('下载 PNG')}</Button>
              <Button onClick={handleDownloadSVG}>{t('下载 SVG')}</Button>
              <Button onClick={handleDownloadAll}>
                {t('下载所有（ZIP）')}
              </Button>
            </div>
          </div>
          <div>
            <div>
              {t(` Download All (ZIP) includes: favicon.ico, favicon.svg, favicon-16x16.png, favicon-32x32.png, favicon-180x180.png, favicon-192x192.png, favicon-512x512.png, favicon-2048x2048.png
              `)}
            </div>
            <div>
              {t(
                'Tip: For emojis or special symbols, we recommend using PNG to ensure consistent display across all systems.'
              )}
            </div>
            <div>
              {t('For additional PNG optimization, check out https://small.im')}
            </div>
          </div>
          <div>
            <div>{t('Favicon HTML Code')}</div>
            <div>
              <pre>
                {`<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />`}
              </pre>
            </div>
            <div>
              {t(
                'To test if the favicon is configured correctly, you can use https://favicon.im'
              )}
            </div>
            <Button>{t('Copy HTML Code')}</Button>
          </div>
        </div>
      </div>

      <Faq data={faqData} />

      <FollowUsOnX />

      <div>
        <p className="mx-auto max-w-[800px] text-center">
          {t(
            '用户有责任确保他们拥有项目中使用的任何字体的适当权利和许可。我们不提供任何字体许可，也不对因不当使用字体而导致的任何版权侵权负责。我们鼓励用户查看并遵守他们使用的每种字体的许可条款，尤其是对于商业应用。'
          )}
        </p>
      </div>
    </div>
  )
}

LogoSurfPage.displayName = 'LogoSurfPage'
