import { useTranslation } from '@/i18n'
import { Button } from '@tongdelove/ui/components/button'
import { FC } from 'react'

interface CopyButtonProps {
  text: string
  label?: string
  size?: string
}

export const CopyButton: FC<CopyButtonProps> = ({ text, label, size }) => {
  const { t } = useTranslation()

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => { })
  }
  return label ? (
    <Button size={size} onClick={handleCopy}>
      {label}
    </Button>
  ) : (
    <IconButton size={size} onClick={handleCopy} aria-label={t('copy')} />
  )
}
