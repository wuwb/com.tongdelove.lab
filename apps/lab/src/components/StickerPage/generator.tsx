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
import { Button as MantineButton, HoverCard, Tooltip } from '@mantine/core'
import { randomInt } from 'es-toolkit'
import { trpc } from '@/utils/trpc'
import { useDeviceId } from '@tongdelove/hooks'
import { STICKER_ENDPOINT } from '@/utils/constants/sticker'

export default function Generator() {
  const { t } = useTranslation()

  const deviceId = useDeviceId()

  const [animal, setAnimal] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [accessory, setAccessory] = useState<string>('')
  const [doing, setDoing] = useState<string>('')
  const [style, setStyle] = useState<string>('')

  const [loading, setLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const [tperformance, setPerformance] = useState(0)

  const [uploadedImage, setUploadedImage] = useState<string>('')

  const s3Mutation = trpc.s3.getPresignedUrl.useMutation()
  const createStickerMutation = trpc.sticker.create.useMutation()
  // const 

  const animals = [
    [t('小狗'), 'dog'],
    [t('小猫'), 'cat'],
    [t('小鸟'), 'bird'],
    [t('狮子'), 'lion'],
  ]
  const objectItems = [
    [t('小汽车'), 'car'],
    [t('雪糕'), 'icecream'],
  ]
  const colors = [
    [t('红色'), 'red'],
    [t('金色'), 'golden'],
    [t('蓝色'), 'blue'],
    [t('绿色'), 'green'],
    [t('粉色'), 'pink'],
  ]
  const accessories = [
    [t('帽子'), 'hat'],
    [t('眼镜'), 'glasses'],
    [t('领带'), 'tie'],
    [t('围巾'), 'scarf'],
    [t('夹克'), 'jacket'],
  ]
  const doingItems = [
    [t('跳舞'), 'dance'],
    [t('微笑'), 'smiling'],
    [t('坐'), 'sitting'],
  ]
  const styleItems = [
    [t('素描'), 'sketch'],
    [t('黑白'), 'b&w'],
    [t('像素'), 'pixel'],
    [t('三维'), '3d'],
  ]

  const generateImage = async () => {
    try {
      setLoading(true)

      const basePrompt =
        animal +
        ', vivid, cute, friendly, bright, simple sticker in Pixar style, clear background with' +
        color +
        'color theme and border, with a' +
        accessory +
        'accessory and doing ' +
        doing +
        'and in ' +
        style +
        'style'

      if (animal !== '') {
        const newUrl = STICKER_ENDPOINT + '?prompt=' + basePrompt

        const t1 = performance.now()


        // const result = await createStickerMutation.mutateAsync({
        //   object: animal,
        //   color,
        //   accessory,
        //   doing,
        //   style,
        // })

        // console.log('result: ', result)

        const response = await fetch(newUrl, {
          method: 'get',
        })

        if (response.ok) {
          console.log('response: ', response)

          const t2 = performance.now()
          setPerformance(t2 - t1 - 300)
          const blob = await response.blob()
          const objectUrl = URL.createObjectURL(blob)
          setImgUrl(objectUrl)

          // 生成链接
          const key = `stickers/${Date.now()}`
          const presignedUrl = await s3Mutation.mutateAsync({
            key,
            contentType: 'image/png',
            bucket: `lab-sticker`,
          })

          try {
            // 上传
            await fetch(presignedUrl, {
              method: 'PUT',
              body: new File([blob], 'generated.png', {
                type: 'image/png',
              }),
            })

            const imageUrl = `https://${presignedUrl.split('/')[2]}/${key}`

            console.log('imageUrl: ', imageUrl)

            setUploadedImage(imageUrl)

            createStickerMutation.mutateAsync({
              object: animal,
              color,
              accessory,
              doing,
              style,
              deviceId,
              url: imageUrl,
            })

          } catch (err) {
            console.error(err)
          }

          toast.success('Image generated successfully!')
        } else {
          toast.error('An error occurred while generating the image.')
        }
      }
    } catch (error) {
      toast.error('An error occurred while generating the image.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnimalClick = (animal: string) => {
    setAnimal(animal)
  }

  const handleColorClick = (color: string) => {
    setColor(color)
  }

  const handleAccessoryClick = (accessory: string) => {
    setAccessory(accessory)
  }

  const handleDoingClick = (doing: string) => {
    setDoing(doing)
  }

  const handleStyleClick = (style: string) => {
    setStyle(style)
  }

  const handleRandom = () => {
    const randomObjectTarget = [...animals, ...objectItems]
    const randomObjectIndex = randomInt(randomObjectTarget.length)
    const randomObject = randomObjectTarget[randomObjectIndex]?.[1]
    setAnimal(randomObject)

    setColor(colors[randomInt(colors.length)]?.[1])
    setAccessory(accessories[randomInt(accessories.length)]?.[1])
    setDoing(doingItems[randomInt(doingItems.length)]?.[1])
    setStyle(styleItems[randomInt(styleItems.length)]?.[1])
  }

  const renderQuickAction = (objects, action) => {
    return objects.map((item, index) => {
      return (
        <MantineButton size="compact-xs" key={item[1] + index} onClick={() => action(item[1])}>{item[0]}</MantineButton>
      )
    })
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
          <Label htmlFor="animal" className="flex justify-between">
            <div className="flex gap-2">
              <span>{t('动物 / 对象')}</span>
              <span className="text-xs">{t('请使用英文单数形式')}</span>
            </div>
            <div>
              <MantineButton size="compact-xs" onClick={handleRandom}>{t('随机')}</MantineButton>
            </div>
          </Label>
          <Input
            required
            id="animal"
            name="animal"
            value={animal}
            onChange={(event) => setAnimal(event.target.value)}
            placeholder="dog, cat, bird, cars, lion, icecream...."
          />
          <div className="flex gap-0.5 flex-wrap">
            {renderQuickAction(animals, handleAnimalClick)}
            {renderQuickAction(objectItems, handleAnimalClick)}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="grid flex-1 gap-4">
            <Label htmlFor="color">{t('颜色')}</Label>
            <Input
              required
              id="color"
              name="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              placeholder="blue, golden, red..."
            />
            <div className="flex gap-0.5 flex-wrap">
              {renderQuickAction(colors, handleColorClick)}
            </div>
          </div>
          <div className="grid flex-1 gap-4">
            <Label htmlFor="accessory">{t('配饰')}</Label>
            <Input
              required
              id="accessory"
              name="accessory"
              value={accessory}
              onChange={(event) => setAccessory(event.target.value)}
              placeholder="hat, sunglasses, jacket..."
            />
            <div className="flex gap-0.5 flex-wrap">
              {renderQuickAction(accessories, handleAccessoryClick)}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="grid flex-1 gap-4">
            <Label htmlFor="doing">{t('在做什么')}</Label>
            <Input
              required
              id="doing"
              name="doing"
              value={doing}
              onChange={(event) => setDoing(event.target.value)}
              placeholder="sitting, dance, smiling..."
            />
            <div className="flex gap-0.5 flex-wrap">
              {renderQuickAction(doingItems, handleDoingClick)}
            </div>

          </div>
          <div className="grid flex-1 gap-4">
            <Label htmlFor="style">{t('样式')}</Label>
            <Input
              required
              id="style"
              name="style"
              value={style}
              onChange={(event) => setStyle(event.target.value)}
              placeholder="sketch, b&w, pixel, 3d..."
            />
            <div className="flex gap-0.5 flex-wrap">
              {renderQuickAction(styleItems, handleStyleClick)}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="lg"
            className="w-9/12"
            onClick={generateImage}
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
              <div>{t('50mm * 50mm 100张，40元')}</div>
              <div>{t('100mm * 100mm 100张，50元')}</div>
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
          {t('Time taken:')}
          <span className="text-primary">
            {(tperformance / 1000).toFixed(2)}
          </span>{' '}
          {t('secs')}
        </p>
      </div>
    </div>
  )
}
