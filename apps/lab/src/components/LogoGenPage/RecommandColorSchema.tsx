import { useTranslation } from '@/i18n'
import { Button } from '@tongdelove/ui/components/button'

export type ColorSchema = {
  backgroundColor: string
  textColor: string
  title?: string
}

interface RecommandColorSchemaProps {
  onChange: (item: ColorSchema) => void
  onRamdon: () => void
}

export const RecommandColorSchemas = ({
  onChange,
  onRamdon,
}: RecommandColorSchemaProps) => {
  const { t } = useTranslation()

  let recommandColorSchemas: ColorSchema[] = [
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

  recommandColorSchemas = [
    { backgroundColor: '#FF69B4', textColor: '#000000' },
    { backgroundColor: '#FF00FF', textColor: '#000000' },
    { backgroundColor: '#00BFFF', textColor: '#000000' },
    { backgroundColor: '#00FF7F', textColor: '#000000' },
    { backgroundColor: '#FFFAFA', textColor: '#000000' },
    { backgroundColor: '#FF6347', textColor: '#000000' },
    { backgroundColor: '#ADD8E6', textColor: '#000000' },
    { backgroundColor: '#FFA07A', textColor: '#000000' },
    { backgroundColor: '#FFD700', textColor: '#000000' },
    { backgroundColor: '#8A2BE2', textColor: '#FFFFFF' },
    { backgroundColor: '#DC143C', textColor: '#FFFFFF' },
    { backgroundColor: '#FF4500', textColor: '#FFFFFF' },
    { backgroundColor: '#1C1C1C', textColor: '#FFFFFF' },
    { backgroundColor: '#005555', textColor: '#FFFFFF' },
    { backgroundColor: '#008B8B', textColor: '#FFFFFF' },
    { backgroundColor: '#CD5C5C', textColor: '#FFFFFF' },
    { backgroundColor: '#FF8C00', textColor: '#FFFFFF' },
    { backgroundColor: '#008080', textColor: '#F0FFFF' },
    { backgroundColor: '#006400', textColor: '#ADFF2F' },
    { backgroundColor: '#8B0000', textColor: '#FFC0CB' },
    { backgroundColor: '#2F4F4F', textColor: '#FFFF00' },
  ]

  return (
    <div>
      <div>{t('推荐颜色配置')}</div>
      <div className="flex flex-wrap gap-1.5">
        {recommandColorSchemas.map((item, index) => {
          return (
            <Button
              size="xs"
              key={index}
              style={{
                backgroundColor: item.backgroundColor,
                color: item.textColor,
              }}
              onClick={() => onChange(item)}
            >
              {item.title ?? `${item.textColor}/${item.backgroundColor}`}
            </Button>
          )
        })}
        <Button key="random" size="xs" onClick={onRamdon}>
          {t('随机')}
        </Button>
      </div>
    </div>
  )
}
