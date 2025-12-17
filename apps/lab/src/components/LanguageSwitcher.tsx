import { useTranslation } from '@/i18n'
import { getLocale } from '@/i18n/locale'
import { useRouter } from 'next/router'
import { popularUserLanguages } from '@/i18n/language'
import { UserLanguageCode } from '@prisma/client'
import { RiTranslate2 } from 'react-icons/ri'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tongdelove/ui/components/dropdown-menu'
import { Button } from '@tongdelove/ui/components/button'

export const LanguageSwitcher = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { pathname, query } = router
  const asPath = decodeURIComponent(router.asPath)

  const handleLanguageChange = (language: {
    code: UserLanguageCode
    name: string
  }) => {
    const targetLocale = getLocale(language.code)
    if (router.locale !== targetLocale) {
      router.replace({ pathname, query }, asPath, {
        locale: targetLocale,
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('切换语言')}>
          <RiTranslate2 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {popularUserLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className="cursor-pointer"
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
