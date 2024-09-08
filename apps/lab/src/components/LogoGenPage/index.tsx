import { useForm } from '@mantine/form'
import {
  Button,
  ColorInput,
  Select,
  Slider,
  TextInput,
  Text,
  CopyButton,
  NumberInput,
} from '@mantine/core'
import { useTranslation } from '@/i18n'
import { FollowUsOnX } from '@/components/FollowUsOnX'
import { useEffect, useRef, useState } from 'react'
import { saveAs } from 'file-saver'
import { svgToPng } from '@/utils/svg'
import JSZip from 'jszip'
import { trpc } from '@/utils/trpc'
import { useDeviceId } from '@/hooks/useDeviceId'
import { getRandomHexColor } from '@/utils/randoms/getRandomHexColor'
import { LogoGenFaq } from './LogoGenFaq'
import { Code } from '@/components/ui/Code'

export const LogoGenPage = () => {
  const { t } = useTranslation()

  const recommandColorSchemas = [
    {
      backgroundColor: '#1a365d',
      textColor: '#ffffff',
      title: t('Deep Blue'),
    },
    {
      backgroundColor: '#2D3748',
      textColor: '#ED8936',
      title: t('Dark Gray & Orange'),
    },
    {
      backgroundColor: '#744210',
      textColor: '#F6E05E',
      title: t('Brown & Yellow'),
    },
    {
      backgroundColor: '#1A202C',
      textColor: '#63B3ED',
      title: t('Almost Black & Sky Blue'),
    },
    {
      backgroundColor: '#702459',
      textColor: '#FBBF24',
      title: t('Purple & Yellow'),
    },
    {
      backgroundColor: '#065F46',
      textColor: '#6EE7B7',
      title: t('Dark Green & Light Green'),
    },
    {
      backgroundColor: '#3730A3',
      textColor: '#FCA5A5',
      title: t('Indigo & Light Red'),
    },
    {
      backgroundColor: '#131516',
      textColor: '#70e000',
      title: t('Black & Neon Green'),
    },
    {
      backgroundColor: '#E53E3E',
      textColor: '#FFFFFF',
      title: t('Red & White'),
    },
    {
      backgroundColor: '#2B6CB0',
      textColor: '#BEE3F8',
      title: t('Blue & Light Blue'),
    },
    {
      backgroundColor: '#2D3748',
      textColor: '#F7FAFC',
      title: t('Dark Gray & Off White'),
    },
    {
      backgroundColor: '#975A16',
      textColor: '#FEFCBF',
      title: t('Brown & Pale Yellow'),
    },
    {
      backgroundColor: '#276749',
      textColor: '#C6F6D5',
      title: t('Green & Pale Green'),
    },
    {
      backgroundColor: '#6B46C1',
      textColor: '#E9D8FD',
      title: t('Purple & Lavender'),
    },
    {
      backgroundColor: '#2C7A7B',
      textColor: '#81E6D9',
      title: t('Teal & Light Teal'),
    },
    {
      backgroundColor: '#9C4221',
      textColor: '#FEEBC8',
      title: t('Burnt Orange & Peach'),
    },
    {
      backgroundColor: '#000000',
      textColor: '#FFA31A',
      title: t('Bold Black & Yellow'),
    },
  ]

  const initialValues = {
    text: t('AI'),
    size: 512,
    radius: 90,
    backgroundColor: '#975A16',
    fontFamily: 'Impact',
    fontWeight: 400,
    fontSize: 394,
    fontRotate: 0,
    textColor: '#FEFCBF',
    textStrokeColor: '#eee',
    textStrokeWidth: 0,
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
      textStrokeColor: formValue.textStrokeColor,
      textStrokeWidth: formValue.textStrokeWidth,

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

  const handleRandomColor = async (type: string) => {
    const color = getRandomHexColor()
    form.setFieldValue(type, color)
  }

  const handleRandomColors = () => {
    const color1 = getRandomHexColor()
    const color2 = getRandomHexColor()
    console.log('color1: ', color1)
    console.log('color2: ', color2)
    form.setFieldValue('backgroundColor', color1)
    form.setFieldValue('textColor', color2)
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
      <div>
        <h1 className="pt-20 text-center text-4xl font-bold">
          {t('Logo 和 Favicon 生成器')}
        </h1>
        <h2 className="mt-2.5 pb-20 text-center text-xl">
          {t('几秒钟内创建专业的 LOGO 和 Favicon')}
        </h2>
      </div>

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
                <p>
                  （支持 Emoji，可以从这里复制：
                  <a href="https://emojispark.com" target="_blank">
                    EmojiSpark.com
                  </a>
                  ）
                </p>

                <div className="flex items-end gap-2.5">
                  <div className="flex-1">
                    <Text size="sm" mt="xl">
                      {t('大小')}
                    </Text>
                    <Slider
                      defaultValue={512}
                      min={16}
                      max={2048}
                      step={1}
                      marks={[
                        { value: 16 },
                        { value: 24 },
                        { value: 29 },
                        { value: 32 },
                        { value: 36 },
                        { value: 48 },
                        { value: 57 },
                        { value: 58 },
                        { value: 64, label: '64' },
                        { value: 72 },
                        { value: 96 },
                        { value: 114 },
                        { value: 128 },
                        { value: 144 },
                        { value: 192 },
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
                  </div>
                </div>
                <div className="flex items-end gap-2.5">
                  <div className="flex-1">
                    <Text size="sm" mt="xl">
                      {t('圆角')}
                    </Text>
                    <Slider
                      defaultValue={90}
                      min={0}
                      max={formValue.size / 2}
                      step={1}
                      marks={[
                        { value: 5.088 },

                        { value: 10, label: '10' },
                        { value: 10.175 },

                        { value: 12.632 },

                        { value: 18 },

                        { value: 20, label: '20' },
                        { value: 25, label: '25' },
                        { value: 25.263 },
                        { value: 89.825 },

                        { value: 180, label: '180' },
                      ]}
                      key={form.key('radius')}
                      {...form.getInputProps('radius')}
                      labelTransitionProps={{
                        transition: 'skew-down',
                        duration: 150,
                        timingFunction: 'linear',
                      }}
                    />
                  </div>
                </div>
                <div className="mt-5 flex items-end gap-2">
                  <ColorInput
                    className="flex-1"
                    label={t('背景颜色')}
                    key={form.key('backgroundColor')}
                    {...form.getInputProps('backgroundColor')}
                  />
                  <Button onClick={() => handleRandomColor('backgroundColor')}>
                    {t('随机')}
                  </Button>
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
                <div>
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
                </div>
                <div className="mt-10 flex items-end gap-2">
                  <ColorInput
                    className="flex-1"
                    label={t('文字颜色')}
                    key={form.key('textColor')}
                    {...form.getInputProps('textColor')}
                  />
                  <Button onClick={() => handleRandomColor('textColor')}>
                    {t('随机')}
                  </Button>
                </div>
                <Text size="sm" mt="xl">
                  {t('文字大小')}
                </Text>
                <Slider
                  defaultValue={0}
                  min={8}
                  max={formValue.size * 1.5}
                  step={1}
                  key={form.key('fontSize')}
                  {...form.getInputProps('fontSize')}
                  labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                  }}
                />

                <div className="flex items-end gap-2">
                  <ColorInput
                    className="flex-1"
                    label={t('文字边框颜色')}
                    key={form.key('textStrokeColor')}
                    {...form.getInputProps('textStrokeColor')}
                  />
                  <Button onClick={() => handleRandomColor('textStrokeColor')}>
                    {t('随机')}
                  </Button>
                </div>

                <Text size="sm" mt="xl">
                  {t('文字边框粗细')}
                </Text>
                <Slider
                  defaultValue={0}
                  min={0}
                  max={formValue.size / 2}
                  step={1}
                  key={form.key('textStrokeWidth')}
                  {...form.getInputProps('textStrokeWidth')}
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
                <div>
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
                </div>
                <div>
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
                </div>
                <div className="flex gap-1.5">
                  <Button onClick={handleReset}>{t('重置')}</Button>
                </div>
              </form>
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
                  stroke={formValue.textStrokeColor}
                  strokeWidth={formValue.textStrokeWidth}
                >
                  {formValue.text}
                </text>
              </svg>
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            <div>
              <div>{t('推荐颜色配置')}</div>
              <div className="flex flex-wrap gap-1.5">
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
                <Button onClick={handleRandomColors}>{t('随机')}</Button>
              </div>
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
              <Code
                code={`<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />`}
                language="html"
              />
            </div>
            <div>
              {t(
                'To test if the favicon is configured correctly, you can use https://favicon.im'
              )}
            </div>
            <CopyButton
              value={`<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />`}
            >
              {({ copied, copy }) => (
                <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                  {copied ? t('Copied') : t('Copy HTML Code')}
                </Button>
              )}
            </CopyButton>
          </div>
        </div>
      </div>

      <LogoGenFaq />
      <div className="mb-20">
        <FollowUsOnX />
      </div>

      <div className="py-5">
        <p className="mx-auto max-w-[800px] text-center">
          {t(
            '用户有责任确保他们拥有项目中使用的任何字体的适当权利和许可。我们不提供任何字体许可，也不对因不当使用字体而导致的任何版权侵权负责。我们鼓励用户查看并遵守他们使用的每种字体的许可条款，尤其是对于商业应用。'
          )}
        </p>
      </div>
    </div>
  )
}

LogoGenPage.displayName = 'LogoGenPage'
