'use client'

import { toast } from 'sonner'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { DownloadIcon, Loader2 } from 'lucide-react'
import { Label } from './components/label'
import { Button } from './components/button'
import { Skeleton } from './components/skeleton'
import { Input } from './components/input'
import { useTranslation } from '@/i18n'
import img1 from './assets/placeholder.png'
import qrcode from './assets/qrcode.png'
import { HoverCard } from '@mantine/core'

export default function Generator() {
  const { t } = useTranslation()

  const animal = useRef<HTMLInputElement>(null)
  const color = useRef<HTMLInputElement>(null)
  const accessory = useRef<HTMLInputElement>(null)
  const doing = useRef<HTMLInputElement>(null)
  const style = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const [tperformance, setPerformance] = useState(0)
  const url = 'https://ai-image-api.xeven.workers.dev/img'

  async function generateImage() {
    try {
      setLoading(true)

      const basePrompt =
        animal.current?.value +
        ', vivid, cute, friendly, bright, simple sticker in Pixar style, clear background with' +
        color.current?.value +
        'color theme and border, with a' +
        accessory.current?.value +
        'accessory and doing ' +
        doing.current?.value +
        'and in ' +
        style.current?.value +
        'style'

      if (animal.current !== null) {
        const newUrl = url + '?prompt=' + basePrompt

        const t1 = performance.now()

        const response = await fetch(newUrl, {
          method: 'get',
        })

        if (response.ok) {
          const t2 = performance.now()
          setPerformance(t2 - t1 - 300)
          const blob = await response.blob()
          const objectUrl = URL.createObjectURL(blob)
          setImgUrl(objectUrl)
          toast.success('Image generated successfully!')
        } else {
          toast.error('An error occurred while generating the image.')
        }
      }
    } catch (error) {
      toast.error('An error occurred while generating the image.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-2 md:gap-24 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="grid gap-4">
          <h1 className="text-shadow relative text-3xl font-bold md:text-4xl">
            {t('贴纸生成器')}
          </h1>
          <h2 className="text-xl">
            {t('在线生成贴纸，直接下单印刷，配送到家。')}
          </h2>
          <p className="text-md">{t('请用英文输入相关关键词')}</p>
        </div>
        <div className="grid gap-4">
          <Label htmlFor="animal">{t('动物 / 对象')}</Label>
          <Input
            required
            ref={animal}
            id="animal"
            name="animal"
            placeholder="dog, cat, bird, cars, lion, icecream...."
          />
        </div>
        <div className="flex flex-row gap-4">
          <div className="grid flex-1 gap-4">
            <Label htmlFor="color">{t('颜色')}</Label>
            <Input
              required
              ref={color}
              id="color"
              name="color"
              placeholder="blue, golden, red..."
            />
          </div>
          <div className="grid flex-1 gap-4">
            <Label htmlFor="accessory">{t('配饰')}</Label>
            <Input
              required
              ref={accessory}
              id="accessory"
              name="accessory"
              placeholder="hat, sunglasses, jacket..."
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="grid flex-1 gap-4">
            <Label htmlFor="doing">{t('在做什么')}</Label>
            <Input
              required
              ref={doing}
              id="doing"
              name="doing"
              placeholder="sitting, dance, smiling..."
            />
          </div>
          <div className="grid flex-1 gap-4">
            <Label htmlFor="style">{t('样式')}</Label>
            <Input
              required
              ref={style}
              id="style"
              name="style"
              placeholder="sketch, b&w, pixel, 3d..."
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="lg"
            className="w-9/12"
            onClick={() => generateImage()}
            disabled={loading}
          >
            {t('生成贴纸')}
            {loading && <Loader2 size={20} className="ml-2 animate-spin" />}
          </Button>
          <HoverCard width={320} shadow="md" withArrow openDelay={200} closeDelay={400}
            position="top"
          >
            <HoverCard.Target>
              <Button
                size="lg"
                className="w-3/12"
              >
                {t('联系客服下单')}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Image src={qrcode} alt={t('微信二维码')} />
            </HoverCard.Dropdown>
          </HoverCard>
        </div>
      </div>

      <div className="group flex min-h-[500px] flex-col items-center justify-center">
        {loading ? (
          <Skeleton className="h-full w-full rounded-full" />
        ) : (
          <div className="relative m-2 flex aspect-square overflow-hidden rounded-full border shadow shadow-muted transition-all duration-500 hover:shadow-lg hover:shadow-muted">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt="Generated Image"
                width={600}
                height={600}
                className="max-w-full object-cover transition-all duration-700 group-hover:scale-110"
              />
            ) : (
              <Image
                src={img1}
                alt="Generated Image"
                priority
                placeholder="blur"
                width={600}
                height={600}
                className="max-w-full object-cover transition-all duration-700 group-hover:scale-110"
              />
            )}

            {imgUrl && (
              <Button
                size={'icon'}
                onClick={() => {
                  if (imgUrl) {
                    const a = document.createElement('a')
                    a.href = imgUrl
                    a.download = 'generated-image.png'
                    a.click()
                    toast.success('Image downloaded successfully!')
                  }
                }}
                className="absolute bottom-2 left-1/2 mx-auto -translate-x-1/2 rounded-full bg-white/30 p-2 shadow-md backdrop-blur-md hover:bg-white/30"
              >
                <DownloadIcon />
              </Button>
            )}
          </div>
        )}

        <p className="my-2">
          Time taken:{' '}
          <span className="text-primary">
            {(tperformance / 1000).toFixed(2)}
          </span>{' '}
          secs
        </p>
      </div>
    </div>
  )
}
