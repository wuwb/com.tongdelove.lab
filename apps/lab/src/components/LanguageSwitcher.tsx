import { Menu, ActionIcon } from '@mantine/core'
import { useTranslation } from '@/i18n'
import { getLocale } from '@/i18n/locale'
import { useRouter } from 'next/router'
import { popularUserLanguages } from '@/i18n/language'
import { UserLanguageCode } from '@prisma/client'
import { useState } from 'react'
import { RiAB } from 'react-icons/ri'

export const LanguageSwitcher = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { pathname, query } = router
  const asPath = decodeURIComponent(router.asPath)

  const [opened, setOpened] = useState(false)

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
    setOpened(false)
  }

  return (
    <Menu
      shadow="md"
      width={200}
      transitionProps={{ transition: 'rotate-right', duration: 150 }}
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <ActionIcon variant="outline">
          <RiAB />
          {/* {t('切换语言')} */}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {popularUserLanguages.map((language) => (
          <Menu.Label
            key={language.code}
            onClick={() => handleLanguageChange(language)}
          >
            {language.name}
          </Menu.Label>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
