import { Button } from '@tongdelove/ui/components/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tongdelove/ui/components/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@tongdelove/ui/components/tooltip'
import { Slider } from '@tongdelove/ui/components/slider'
import { Input } from '@tongdelove/ui/components/input'
import { Textarea } from '@tongdelove/ui/components/textarea'
import { Label } from '@tongdelove/ui/components/label'
import { Checkbox } from '@tongdelove/ui/components/checkbox'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tongdelove/ui/components/popover'
import { cn } from '@tongdelove/ui/lib/utils'

// Helper components
const ColorInput = ({
  value,
  onChange,
  className,
  label,
}: {
  value: string
  onChange: (val: string) => void
  className?: string
  label?: string
}) => {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <Label className="text-xs">{label}</Label>}
      <div className="flex items-center gap-2">
        <div className="relative overflow-hidden rounded-md border shadow-sm w-full h-9 flex items-center">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] cursor-pointer border-none p-0"
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono uppercase text-foreground mix-blend-difference">
            {value}
          </span>
        </div>
      </div>
    </div>
  )
}

const ControlWrapper = ({
  label,
  children,
  className,
  description,
}: {
  label: string
  children: React.ReactNode
  className?: string
  description?: React.ReactNode
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex flex-col gap-1">
        <Label className="text-xs font-medium">{label}</Label>
        {description && <div className="text-[10px] text-muted-foreground">{description}</div>}
      </div>
      {children}
    </div>
  )
}

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

  // Direct state update helper
  const handleValueChange = (key: keyof typeof initialValues, value: any) => {
    setFormValue((prev) => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setFormValue(initialValues)
  }

  const handleChangeRecommandColorSchema = (data: ColorSchema) => {
    handleValueChange('backgroundColor', data.backgroundColor)
    handleValueChange('textColor', data.textColor)
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
    const svgBlob = new Blob([svgContent], {
      type: 'image/svg+xml;charset=utf-8',
    })
    saveAs(svgBlob, `${formValue.text}-${formValue.size}x${formValue.size}.svg`)
  }

  const createFavicon = (size: number): Promise<Blob> => {
    if (!svgRef.current) throw new Error('SVG ref not found')
    const svgString = new XMLSerializer().serializeToString(svgRef.current)
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
    const nameMap: Record<string, string> = {
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

  const handleRandomColor = async (type: keyof typeof initialValues) => {
    const color = getRandomHexColor()
    handleValueChange(type, color)
  }

  const handleRandomColors = () => {
    handleRandomColor('backgroundColor')
    handleRandomColor('textColor')
  }

  const adjustTextSizeAndPosition = (text: string, size: number) => {
    if (!textRef.current) {
      return 394 // default fallback
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

  const handleSizeChange = (value: string | number) => {
    const valueNumber = Number(value)
    handleValueChange('size', valueNumber)

    if (prevSize.current > 0) {
      // 按比例调整字体大小
      const rate = valueNumber / prevSize.current
      const newFontSize = formValue.fontSize * rate
      handleValueChange('fontSize', newFontSize)
    }
  }

  const handleSizeChangeEnd = (value: number) => {
    fixFontSize(formValue.text, value)
    const fontSize = adjustTextSizeAndPosition(formValue.text, value)
    handleValueChange('fontSize', fontSize)
  }

  const handleSetIcon = (item: any) => {
    const { id: _id, ...rest } = item
    setFormValue((prev) => ({ ...prev, ...rest }))
    window.scrollTo({
      top: 300,
      behavior: 'smooth',
    })
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
  }, [formValue.text, formValue.fontFamily, formValue.fontSize, formValue.size])

  const [customFonts] = useState([
    '宋体', 'Arial Narrow', 'Tahoma', 'STHeiTi', 'simsun', 'sans - serif',
    'lucida grande', 'bitstream vera sans', 'Arial', 'Helvetica', 'Times New Roman',
    'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman',
    'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact',
  ])
  const [googlefonts, setGoogleFonts] = useState<string[]>(data)

  const allFonts = [...customFonts, ...googlefonts]
  const [fontSearch, setFontSearch] = useState('')
  const filteredFonts = allFonts.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase()))

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
  }, [formValue.fontFamily, customFonts])

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="pt-10 text-center text-4xl font-bold">
          {t('Logo 和 Favicon 生成器')}
        </h1>
        <h2 className="mt-2.5 pb-10 text-center text-xl text-muted-foreground">
          {t('几秒钟内创建专业的 LOGO 和 Favicon')}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <div className="border rounded-lg p-5 shadow-sm bg-card">
            <div className="space-y-6">
              <div>
                <ControlWrapper
                  label={t('文字')}
                  description={
                    <>
                      （{t('支持换行，支持 Emoji，可以从这里复制：')}
                      <a href="https://emojispark.com" target="_blank" className="text-primary hover:underline">
                        EmojiSpark.com
                      </a>
                      ）
                    </>
                  }
                >
                  <Textarea
                    value={formValue.text}
                    onChange={(e) => handleValueChange('text', e.target.value)}
                    className="min-h-[80px]"
                  />
                </ControlWrapper>

                {formValue.text.replace(/\r\n|\r/g, '\n').includes('\n') && (
                  <div className="flex items-end gap-2.5 mt-2">
                    <ControlWrapper label={t('文字偏移')} className="flex-1">
                      <Slider
                        value={[formValue.lineLead]}
                        onValueChange={([v]) => handleValueChange('lineLead', v)}
                        min={-3}
                        max={3}
                        step={0.01}
                      />
                    </ControlWrapper>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleValueChange('lineLead', 1)}
                    >
                      {t('重置')}
                    </Button>

                    <ControlWrapper label={t('文字行高')} className="flex-1">
                      <Slider
                        value={[formValue.lineHeight]}
                        onValueChange={([v]) => handleValueChange('lineHeight', v)}
                        min={-3}
                        max={3}
                        step={0.01}
                      />
                    </ControlWrapper>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleValueChange('lineHeight', 1)}
                    >
                      {t('重置')}
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-end gap-2.5">
                <ControlWrapper label={t('背景大小')} className="w-32">
                  <Select
                    value={formValue.size.toString()}
                    onValueChange={(v) => handleSizeChange(Number(v))}
                  >
                    <SelectTrigger onMouseDown={hanldeSizeMouseDown}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[16, 24, 32, 48, 64, 128, 256, 512, 1024].map((s) => (
                        <SelectItem key={s} value={s.toString()}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </ControlWrapper>

                <ColorInput
                  className="flex-1"
                  label={t('背景颜色')}
                  value={formValue.backgroundColor}
                  onChange={(v) => handleValueChange('backgroundColor', v)}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRandomColor('backgroundColor')}
                >
                  {t('随机')}
                </Button>
              </div>

              <ControlWrapper label={t('圆角')}>
                <Slider
                  value={[formValue.radius]}
                  onValueChange={([v]) => handleValueChange('radius', v)}
                  min={0}
                  max={formValue.size / 2}
                  step={1}
                />
              </ControlWrapper>

              <div>
                <ControlWrapper
                  label={t('字体')}
                  description={
                    <>
                      （{t('支持 Google Fonts，可以在这查询字体名称：')}
                      <a href="https://fonts.google.com/" target="_blank" className="text-primary hover:underline">
                        Google Fonts
                      </a>
                      ）
                    </>
                  }
                >
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-full justify-between font-normal">
                        {formValue.fontFamily}
                        <span className="opacity-50">▼</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0" align="start">
                      <div className="p-2 border-b">
                        <Input
                          placeholder={t('Search font...')}
                          value={fontSearch}
                          onChange={(e) => setFontSearch(e.target.value)}
                          className="h-8"
                        />
                      </div>
                      <div className="max-h-[300px] overflow-y-auto p-1">
                        {filteredFonts.slice(0, 100).map((font) => (
                          <div
                            key={font}
                            className={cn(
                              "cursor-pointer px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground",
                              formValue.fontFamily === font && "bg-accent text-accent-foreground"
                            )}
                            onClick={() => {
                              handleValueChange('fontFamily', font)
                              // close popover implicitly by UI interaction (or use state if needed, but separate component is better)
                            }}
                          >
                            {font}
                          </div>
                        ))}
                        {filteredFonts.length === 0 && <div className="p-2 text-sm text-muted-foreground text-center">No font found</div>}
                      </div>
                    </PopoverContent>
                  </Popover>
                </ControlWrapper>
              </div>

              <div className="flex flex-col gap-4">
                <ControlWrapper label={t('字体大小')}>
                  <Slider
                    value={[formValue.fontSize]}
                    onValueChange={([v]) => handleValueChange('fontSize', v)}
                    min={8}
                    max={formValue.size * 1.5}
                    step={1}
                  />
                </ControlWrapper>

                <ControlWrapper label={t('字重')}>
                  <Slider
                    value={[formValue.fontWeight]}
                    onValueChange={([v]) => handleValueChange('fontWeight', v)}
                    min={100}
                    max={900}
                    step={100}
                  />
                </ControlWrapper>
              </div>

              <div className="flex items-end gap-2 mt-4">
                <ColorInput
                  className="flex-1"
                  label={t('文字颜色')}
                  value={formValue.textColor}
                  onChange={(v) => handleValueChange('textColor', v)}
                />
                <ControlWrapper label={t('文字透明度')} className="flex-1">
                  <Slider
                    value={[formValue.textOpacity]}
                    onValueChange={([v]) => handleValueChange('textOpacity', v)}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                </ControlWrapper>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRandomColor('textColor')}
                >
                  {t('随机')}
                </Button>
              </div>

              <div className="flex items-end gap-2">
                <ColorInput
                  className="flex-1"
                  label={t('文字边框颜色')}
                  value={formValue.textStrokeColor}
                  onChange={(v) => handleValueChange('textStrokeColor', v)}
                />
                <ControlWrapper label={t('文字边框透明度')} className="flex-1">
                  <Slider
                    value={[formValue.textStrokeOpacity]}
                    onValueChange={([v]) => handleValueChange('textStrokeOpacity', v)}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                </ControlWrapper>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRandomColor('textStrokeColor')}
                >
                  {t('随机')}
                </Button>
              </div>

              <ControlWrapper label={t('文字边框粗细')}>
                <Slider
                  value={[formValue.textStrokeWidth]}
                  onValueChange={([v]) => handleValueChange('textStrokeWidth', v)}
                  min={0}
                  max={formValue.size / 2}
                  step={1}
                />
              </ControlWrapper>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <ControlWrapper label={t('文字旋转')}>
                    <Slider
                      value={[formValue.fontRotate]}
                      onValueChange={([v]) => handleValueChange('fontRotate', v)}
                      min={-180}
                      max={180}
                      step={1}
                    />
                  </ControlWrapper>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleValueChange('fontRotate', 0)}
                  >
                    {t('重置')}
                  </Button>
                </div>

                <div className="flex flex-col gap-2">
                  <ControlWrapper label={t('垂直微调')}>
                    <Slider
                      value={[formValue.fineTuneVerticalPosition]}
                      onValueChange={([v]) => handleValueChange('fineTuneVerticalPosition', v)}
                      min={-0.3}
                      max={0.3}
                      step={0.01}
                    />
                  </ControlWrapper>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleValueChange('fineTuneVerticalPosition', 0)}
                  >
                    {t('重置')}
                  </Button>
                </div>
              </div>

              <div className="flex gap-1.5 pt-4">
                <Button variant="destructive" onClick={handleReset} className="w-full">{t('重置所有')}</Button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <RecommandColorSchemas
              onChange={handleChangeRecommandColorSchema}
              onRamdon={handleRandomColors}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="border rounded-lg p-5 shadow-sm bg-card sticky top-5">
            <div className="grid-background p-5 rounded-md border mb-5 flex justify-center bg-gray-50/50">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${formValue.size} ${formValue.size}`}
                xmlns="http://www.w3.org/2000/svg"
                style={{ maxWidth: '100%', maxHeight: '500px', width: 'auto', height: 'auto' }}
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
                  dx={formValue.fineTuneHorizontalPosition * formValue.size}
                  dy={formValue.fineTuneVerticalPosition * formValue.size}
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
                          x="50%"
                        >
                          {item}
                        </tspan>
                      )
                    })}
                </text>
              </svg>
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>

            <TooltipProvider>
              <div className="flex gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="live"
                    checked={formValue.live}
                    onCheckedChange={(c) => handleValueChange('live', c)}
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="live" className="cursor-help">{t('是否给其他用户查看')}</Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{t('勾选后，点击下载后，你的图标根据设计质量，可能会出现在示例图标等区域，供其他用户查看.')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fork"
                    checked={formValue.fork}
                    onCheckedChange={(c) => handleValueChange('fork', c)}
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="fork" className="cursor-help">{t('是否给其他用户下载')}</Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{t('勾选后，点击下载后，你的图标根据设计质量，可能会出现在示例图标等区域，其他用户可以点击复现你的设计.')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <Button onClick={handleDownloadPNG}>{t('下载 PNG')}</Button>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={handleDownloadSVG}>{t('下载 SVG')}</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{t('Enabling this feature will convert the text to vector paths...')}</p>
                  </TooltipContent>
                </Tooltip>

                <Button variant="secondary" onClick={handleDownloadAll}>
                  {t('下载所有（ZIP）')}
                </Button>
              </div>
            </TooltipProvider>

            <div className="mt-6 text-xs text-muted-foreground space-y-2">
              <p>{t('下载所有（ZIP） 包含下面这些尺寸: 16, 32, 36, 48, 57, 60, 72, 96, 114, 120, 144, 152, 180, 192, 512, 1024, 2048')}</p>
              <p>{t('提示: 使用 emojis 或者特殊图标的时候，建议使用 PNG，以保证在不同平台上的兼容性和一致性。')}</p>
              <p>{t('可以使用 https://tinypng.com/ 进一步优化 PNG 文件大小。')}</p>
            </div>
          </div>
        </div>
      </div>

      <LogoExamples onSetIcon={handleSetIcon} />

      <HowToUse />

      <Information />

      <LogoGenFAQ />

      <div className="mb-20">
        <FollowUsOnX />
      </div>

      <div className="py-5">
        <p className="mx-auto max-w-[800px] text-center text-sm text-muted-foreground">
          {t(
            '用户有责任确保他们拥有项目中使用的任何字体的适当权利和许可。我们不提供任何字体许可，也不对因不当使用字体而导致的任何版权侵权负责。我们鼓励用户查看并遵守他们使用的每种字体的许可条款，尤其是对于商业应用。'
          )}
        </p>
      </div>
    </div>
  )
}

LogoGenPage.displayName = 'LogoGenPage'
