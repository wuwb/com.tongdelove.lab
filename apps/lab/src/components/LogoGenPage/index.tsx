import { useForm } from '@mantine/form'
import {
  Button,
  ColorInput,
  Select,
  Slider,
  TextInput,
  Input,
  Combobox,
  useCombobox,
  Tooltip,
  Checkbox,
  Textarea,
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
import { LogoGenFAQ } from './LogoGenFAQ'
import { LogoExamples } from './LogoExamples'
import { hexToRgba } from '@/utils/color'
import { HowToUse } from './HowToUse'
import { RecommandColorSchemas, ColorSchema } from './RecommandColorSchema'
import { Information } from './Information'
import { clone } from 'es-toolkit'

export const LogoGenPage = () => {
  const { t } = useTranslation()
  const deviceId = useDeviceId()

  const faviconGenMutation = trpc.faviconGen.create.useMutation()
  const { data = [] } = trpc.tool.getGoogleFonts.useQuery()

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
    textOpacity: 1,
    textStrokeColor: '#eee',
    textStrokeOpacity: 1,
    textStrokeWidth: 0,
    fineTuneVerticalPosition: 0,
    fineTuneHorizontalPosition: 0,
    lineLead: -1,
    lineHeight: 1,
    live: false,
    fork: false,
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
    onValuesChange: (values, previous) => {
      const formValue = form.getValues()
      setFormValue(formValue)
    },
  })

  const handleReset = () => {
    form.reset()
  }

  const handleChangeRecommandColorSchema = (data: ColorSchema) => {
    form.setFieldValue('backgroundColor', data.backgroundColor)
    form.setFieldValue('textColor', data.textColor)
  }

  const generateIcon = () => {
    if (!svgRef.current) {
      throw new Error('svg not found')
    }

    return new XMLSerializer().serializeToString(svgRef.current)
  }

  const saveGenerateData = async () => {
    const data = await faviconGenMutation.mutateAsync({
      ...formValue,
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

    const sizes = [
      16, 32, 36, 48, 57, 60, 72, 96, 114, 120, 144, 152, 180, 192, 512, 1024,
      2048,
    ]
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
    handleRandomColor('backgroundColor')
    handleRandomColor('textColor')
  }

  const adjustTextSizeAndPosition = (text: string, size: number) => {
    if (!textRef.current) {
      return
    }
    const isAllEnglish = /^[A-Za-z0-9\s]+$/.test(text)
    const charCount = text.length

    let fontSize
    if (charCount <= 2) {
      fontSize = size * 0.8
    } else if (isAllEnglish) {
      fontSize = size * 0.75
    } else {
      fontSize = size * 0.6
    }

    return fontSize
  }

  const fixFontSize = (text: string, size: number) => {
    if (!textRef.current) {
      return
    }
    let fontSize = formValue.fontSize
    const isAllEnglish = /^[A-Za-z0-9\s]+$/.test(text)

    const maxWidth = size * 0.95
    const maxHeight = size * 0.95
    const scaleFactor = isAllEnglish ? 0.98 : 0.95

    let iterations = 0
    const maxIterations = 50

    while (fontSize > 1 && iterations < maxIterations) {
      const bbox = textRef.current.getBBox()
      if (bbox.width <= maxWidth && bbox.height <= maxHeight) {
        break
      }
      fontSize *= scaleFactor
      iterations++
    }
    return fontSize
  }

  const prevSize = useRef(0)
  const hanldeSizeMouseDown = () => {
    prevSize.current = clone(formValue.size)
  }

  const handleSizeChange = (value: string | null) => {
    if (value === null) {
      return
    }
    let valueNumber = Number(value)
    form.getInputProps('size').onChange(valueNumber)

    // 按比例调整字体大小
    const rate = valueNumber / prevSize.current
    const newFontSize = formValue.fontSize * rate
    form.setFieldValue('fontSize', newFontSize)
  }

  const handleSizeChangeEnd = (value: number) => {
    fixFontSize(formValue.text, value)
    const fontSize = adjustTextSizeAndPosition(formValue.text, value)
    form.setFieldValue('fontSize', fontSize)
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

  const [customFonts, setCustomFonts] = useState([
    '宋体',
    'Arial Narrow',
    'Tahoma',
    'STHeiTi',
    'simsun',
    'sans - serif',
    'lucida grande',
    'bitstream vera sans',
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
  ])
  const [googlefonts, setGoogleFonts] = useState<string[]>(data)

  const combobox = useCombobox()
  const shouldFilterOptions = !customFonts.some(
    (item) => item === formValue.fontFamily
  )
  const filteredOptions = shouldFilterOptions
    ? [
        ...customFonts.filter((item) =>
          item.toLowerCase().includes(formValue.fontFamily.toLowerCase().trim())
        ),
        ...googlefonts.filter((item) =>
          item.toLowerCase().includes(formValue.fontFamily.toLowerCase().trim())
        ),
      ]
    : customFonts

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ))

  useEffect(() => {
    if (data?.length > 0) {
      setGoogleFonts(data)
    }
  }, [data])

  useEffect(() => {
    if (formValue.fontFamily && !customFonts.includes(formValue.fontFamily)) {
      const link = document.createElement('link')
      link.href = `https://fonts.googleapis.com/css2?family=${formValue.fontFamily.replace(/\s+/g, '+')}&display=swap`
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
  }, [formValue.fontFamily])

  // console.log('formValue.text: ', formValue.text)
  // console.log('2: ', formValue.text.replace(/\r\n|\r/g, '\n').split('\n'))

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

      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 sm:p-5">
          <div className="border p-5">
            <div>
              <form
                onSubmit={form.onSubmit((values) => console.log(values))}
                className="space-y-2"
              >
                <div>
                  <Textarea
                    size="xs"
                    label={t('文字')}
                    description={
                      <>
                        （{t('支持换行，支持 Emoji，可以从这里复制：')}
                        <a href="https://emojispark.com" target="_blank">
                          EmojiSpark.com
                        </a>
                        ）
                      </>
                    }
                    key={form.key('text')}
                    {...form.getInputProps('text')}
                  />
                  {formValue.text.replace(/\r\n|\r/g, '\n').includes('\n') && (
                    <div className="flex items-end gap-2.5">
                      <Input.Wrapper
                        size="xs"
                        className="flex-1"
                        label={t('文字偏移')}
                      >
                        <Slider
                          className="flex-1"
                          min={-3}
                          max={3}
                          step={0.01}
                          key={form.key('lineLead')}
                          {...form.getInputProps('lineLead')}
                          labelTransitionProps={{
                            transition: 'skew-down',
                            duration: 150,
                            timingFunction: 'linear',
                          }}
                        />
                      </Input.Wrapper>
                      <Button
                        size="xs"
                        onClick={() => form.setFieldValue('lineLead', 1)}
                      >
                        {t('重置')}
                      </Button>
                      <Input.Wrapper
                        size="xs"
                        className="flex-1"
                        label={t('文字行高')}
                      >
                        <Slider
                          className="flex-1"
                          min={-3}
                          max={3}
                          step={0.01}
                          key={form.key('lineHeight')}
                          {...form.getInputProps('lineHeight')}
                          labelTransitionProps={{
                            transition: 'skew-down',
                            duration: 150,
                            timingFunction: 'linear',
                          }}
                        />
                      </Input.Wrapper>
                      <Button
                        size="xs"
                        onClick={() => form.setFieldValue('lineHeight', 1)}
                      >
                        {t('重置')}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-end gap-2.5">
                  {/* <Slider
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
                      onChange={handleSizeChange}
                      onChangeEnd={handleSizeChangeEnd}
                      labelTransitionProps={{
                        transition: 'skew-down',
                        duration: 150,
                        timingFunction: 'linear',
                      }}
                    /> */}
                  <Select
                    size="xs"
                    label={t('背景大小')}
                    key={form.key('size')}
                    {...form.getInputProps('size')}
                    defaultValue={form
                      .getInputProps('size')
                      .defaultValue.toString()}
                    onChange={handleSizeChange}
                    data={[
                      '16',
                      '24',
                      '29',
                      '32',
                      '36',
                      '48',
                      '57',
                      '58',
                      '60',
                      '64',
                      '72',
                      '76',
                      '96',
                      '114',
                      '120',
                      '128',
                      '144',
                      '152',
                      '180',
                      '192',
                      '256',
                      '512',
                      '1024',
                      '2048',
                    ]}
                    searchable
                    checkIconPosition="right"
                    onMouseDown={hanldeSizeMouseDown}
                  />

                  <ColorInput
                    size="xs"
                    className="flex-1"
                    label={t('背景颜色')}
                    key={form.key('backgroundColor')}
                    {...form.getInputProps('backgroundColor')}
                  />
                  <Button
                    size="xs"
                    onClick={() => handleRandomColor('backgroundColor')}
                  >
                    {t('随机')}
                  </Button>
                </div>

                <div className="!mb-7 flex items-end gap-2.5">
                  <Input.Wrapper size="xs" className="flex-1" label={t('圆角')}>
                    <Slider
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
                  </Input.Wrapper>
                </div>

                <div>
                  <Combobox
                    size="xs"
                    onOptionSubmit={(optionValue) => {
                      form.getInputProps('fontFamily').onChange(optionValue)
                      combobox.closeDropdown()
                    }}
                    store={combobox}
                  >
                    <Combobox.Target>
                      <TextInput
                        label={t('字体')}
                        description={
                          <>
                            （{t('支持 Google Fonts，可以在这查询字体名称：')}
                            <a href="https://fonts.google.com/" target="_blank">
                              Google Fonts
                            </a>
                            ）
                          </>
                        }
                        {...form.getInputProps('fontFamily')}
                        onChange={(event) => {
                          form
                            .getInputProps('fontFamily')
                            .onChange(event.currentTarget.value)
                          combobox.openDropdown()
                          combobox.updateSelectedOptionIndex()
                        }}
                        onClick={() => combobox.openDropdown()}
                        onFocus={() => combobox.openDropdown()}
                        onBlur={() => combobox.closeDropdown()}
                      />
                    </Combobox.Target>
                    <Combobox.Dropdown>
                      <Combobox.Options>
                        {options.length === 0 ? (
                          <Combobox.Empty>{t('Nothing found')}</Combobox.Empty>
                        ) : (
                          options
                        )}
                      </Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>
                </div>

                <div className="flex h-[30px] items-center gap-2.5">
                  <Input.Wrapper
                    size="xs"
                    className="flex-1"
                    label={t('字体大小')}
                  >
                    <Slider
                      className="flex-1"
                      defaultValue={394}
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
                  </Input.Wrapper>
                </div>

                <div className="flex h-[30px] items-center gap-2.5">
                  <Input.Wrapper
                    size="xs"
                    className="flex-1"
                    label={t('字重（根据浏览器和字体，不一定起效）')}
                  >
                    <Slider
                      className="flex-1"
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
                  </Input.Wrapper>
                </div>

                <div className="!mt-7 mt-10 flex items-end gap-2">
                  <ColorInput
                    size="xs"
                    className="flex-1"
                    label={t('文字颜色')}
                    key={form.key('textColor')}
                    {...form.getInputProps('textColor')}
                  />
                  <Input.Wrapper
                    size="xs"
                    className="flex-1"
                    label={t('文字透明度')}
                  >
                    <Slider
                      defaultValue={1}
                      min={0}
                      max={1}
                      step={0.1}
                      key={form.key('textOpacity')}
                      {...form.getInputProps('textOpacity')}
                      labelTransitionProps={{
                        transition: 'skew-down',
                        duration: 150,
                        timingFunction: 'linear',
                      }}
                    />
                  </Input.Wrapper>
                  <Button
                    size="xs"
                    onClick={() => handleRandomColor('textColor')}
                  >
                    {t('随机')}
                  </Button>
                </div>

                <div className="flex items-end gap-2">
                  <ColorInput
                    size="xs"
                    className="flex-1"
                    label={t('文字边框颜色')}
                    key={form.key('textStrokeColor')}
                    {...form.getInputProps('textStrokeColor')}
                  />
                  <Input.Wrapper
                    size="xs"
                    className="flex-1"
                    label={t('文字边框透明度')}
                  >
                    <Slider
                      defaultValue={1}
                      min={0}
                      max={1}
                      step={0.1}
                      key={form.key('textStrokeOpacity')}
                      {...form.getInputProps('textStrokeOpacity')}
                      labelTransitionProps={{
                        transition: 'skew-down',
                        duration: 150,
                        timingFunction: 'linear',
                      }}
                    />
                  </Input.Wrapper>
                  <Button
                    size="xs"
                    onClick={() => handleRandomColor('textStrokeColor')}
                  >
                    {t('随机')}
                  </Button>
                </div>

                <div className="flex items-end gap-2.5">
                  <Input.Wrapper
                    size="xs"
                    className="flex-1"
                    label={t('文字边框粗细')}
                  >
                    <Slider
                      className="flex-1"
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
                  </Input.Wrapper>
                </div>

                <div className="flex items-end gap-2.5">
                  <Input.Wrapper
                    size="xs"
                    className="flex-1"
                    label={t('文字旋转')}
                  >
                    <Slider
                      className="flex-1"
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
                  </Input.Wrapper>
                  <Button
                    size="xs"
                    onClick={() => form.setFieldValue('fontRotate', 0)}
                  >
                    {t('重置')}
                  </Button>
                </div>
                <div className="flex items-end gap-2.5">
                  <Input.Wrapper
                    size="xs"
                    className="flex-1"
                    label={t('垂直微调')}
                  >
                    <Slider
                      className="flex-1"
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
                  </Input.Wrapper>
                  <Button
                    size="xs"
                    onClick={() =>
                      form.setFieldValue('fineTuneVerticalPosition', 0)
                    }
                  >
                    {t('重置')}
                  </Button>
                </div>
                <div className="flex items-end gap-2.5">
                  <Input.Wrapper
                    size="xs"
                    className="flex-1"
                    label={t('横向微调')}
                  >
                    <Slider
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
                  </Input.Wrapper>
                  <Button
                    size="xs"
                    onClick={() =>
                      form.setFieldValue('fineTuneHorizontalPosition', 0)
                    }
                  >
                    {t('重置')}
                  </Button>
                </div>

                <div className="flex gap-1.5">
                  <Button onClick={handleReset}>{t('重置所有')}</Button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <RecommandColorSchemas
              onChange={handleChangeRecommandColorSchema}
              onRamdon={handleRandomColors}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 sm:p-5">
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
                  fill={hexToRgba(formValue.textColor, formValue.textOpacity)}
                  fontSize={formValue.fontSize}
                  transform={`rotate(${formValue.fontRotate}, ${rotatePoint.x}, ${rotatePoint.y})`}
                  dx={formValue.fineTuneHorizontalPosition * 512}
                  dy={formValue.fineTuneVerticalPosition * 512}
                  stroke={hexToRgba(
                    formValue.textStrokeColor,
                    formValue.textStrokeOpacity
                  )}
                  strokeWidth={formValue.textStrokeWidth}
                >
                  {formValue.text.replace(/\r\n|\r/g, '\n').split('\n')[0]}
                  {formValue.text
                    .replace(/\r\n|\r/g, '\n')
                    .split('\n')
                    .slice(1)
                    .map((item, index) => {
                      return (
                        <tspan
                          key={index}
                          dx={`${formValue.lineLead}em`}
                          dy={`${formValue.lineHeight}em`}
                        >
                          {item}
                        </tspan>
                      )
                    })}
                </text>
              </svg>
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            <div className="flex gap-2">
              <Tooltip
                label={t(
                  '勾选后，点击下载后，你的图标根据设计质量，可能会出现在示例图标等区域，供其他用户查看.'
                )}
              >
                <Checkbox
                  label={t('是否给其他用户查看')}
                  key={form.key('live')}
                  {...form.getInputProps('live')}
                />
              </Tooltip>
              <Tooltip
                label={t(
                  '勾选后，点击下载后，你的图标根据设计质量，可能会出现在示例图标等区域，其他用户可以点击复现你的设计.'
                )}
              >
                <Checkbox
                  label={t('是否给其他用户下载')}
                  key={form.key('fork')}
                  {...form.getInputProps('fork')}
                />
              </Tooltip>
            </div>
            <div className="mt-2.5 flex justify-center gap-2">
              <Button onClick={handleDownloadPNG}>{t('下载 PNG')}</Button>
              <Tooltip
                label={t(
                  'Enabling this feature will convert the text to vector paths, not text tags, thus getting rid of the dependency on font files. Some Asian languages are not supported, including Japanese, Chinese and Korean.'
                )}
              >
                <Button onClick={handleDownloadSVG}>{t('下载 SVG')}</Button>
              </Tooltip>
              <Button onClick={handleDownloadAll}>
                {t('下载所有（ZIP）')}
              </Button>
            </div>
          </div>
          <div>
            <div>
              {t(
                `下载所有（ZIP） 包含下面这些尺寸: 16, 32, 36, 48, 57, 60, 72, 96, 114, 120, 144, 152, 180, 192, 512, 1024, 2048`
              )}
            </div>
            <div>
              {t(
                '提示: 使用 emojis 或者特殊图标的时候，建议使用 PNG，以保证在不同平台上的兼容性和一致性。'
              )}
            </div>
            <div>
              {t('可以使用 https://tinypng.com/ 进一步优化 PNG 文件大小。')}
            </div>
          </div>
        </div>
      </div>

      <HowToUse />

      <Information />

      <LogoGenFAQ />

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
