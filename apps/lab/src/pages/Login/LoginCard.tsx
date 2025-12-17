import AppleLogo from '@/assets/svg/apple_logo.svg'
import AppleModalLogo from '@/assets/svg/apple_modal_logo.svg'
import DiscordLogo from '@/assets/svg/discord_logo.svg'
import GoogleLogo from '@/assets/svg/google_logo.svg'
import TwitterLogo from '@/assets/svg/twitter_logo.svg'
import { useColorWithDisplay } from '@/common/hooks/hooks'
import { descFontWeight } from '@/common/utils/theme'
import { isIOS, isWeb } from '@/common/utils/utils'
import { useFGToast } from '@/components/useToast'
import { gotoLogin } from '@/pages/Auth/auth'
import React, { useRef, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { submitUserAccount } from '../utils'
import { useEvent, useWatch } from '@flowgpt/hooks'
import { useTranslation } from '@i18next-toolkit/react-core'
import LoginButton from '@/components/LoginButton'
import { useFlowRouter } from '@/hooks/useFlowRouter'
import { FLOWROUTES } from '@/common/constants/router'
import {
  type Providers,
  getProviders,
} from '@/pages/Auth/api'
import { useQuery } from '@tanstack/react-query'
import { useRecordEvent } from '@/context/RecordEventProvider'
import { TextDivider } from '@/pages/Login/components/TextDivider'
import Sentry from '@/common/sentry'

const LOGIN_COOLDOWN_MS = 2000

interface LoginCardProps {
  setIsLoading: Function
  onEmailLoginSelect?: () => void
  showInModal?: boolean
}

type LoginOption = {
  key: keyof Providers
  title: string
  icon: JSX.Element
}

export function LoginCard(props: LoginCardProps) {
  const { setIsLoading, onEmailLoginSelect, showInModal = false } = props

  const router = useFlowRouter()
  const toast = useFGToast()
  const {
    disableButtonColor,
    loginItemTextColor,
    loginAppleItemBgColor,
    itemTextColor,
    bgColor2,
  } = useColorWithDisplay()
  const { t } = useTranslation()
  const { recordEvent } = useRecordEvent()

  const initLoginOptions: LoginOption[][] = [
    // group 1 - list
    [
      {
        key: 'google',
        title: `${t('Continue With')} Google`,
        icon: <GoogleLogo />,
      },
    ],
    // group 2 - icons
    [
      // {
      //   key: 'linkedin',
      //   title: 'Linkedin',
      //   icon: <LinkedinLogo />,
      // },
      {
        key: 'twitter',
        title: 'Twitter',
        icon: <TwitterLogo />,
      },
      {
        key: 'discord',
        title: 'Discord',
        icon: <DiscordLogo />,
      },
      // {
      //   key: 'facebook',
      //   title: `${continueText} Facebook`,
      //   icon: <FacebookIcon />,
      // },
      {
        key: 'nodemailer',
        title: t('Email'),
        icon: (
          <Image
            source={require('@/assets/images/email_icon.png')}
            alt=""
            style={styles.emailIcon}
          />
        ),
      },
    ],
  ]

  if (isIOS) {
    initLoginOptions[0].unshift({
      key: 'apple',
      title: `${t('Continue With')} Apple`,
      icon: showInModal ? (
        <AppleModalLogo fill={itemTextColor} />
      ) : (
        <AppleLogo fill={itemTextColor} />
      ),
    })
  }

  const [loginOptions, setLoginOptions] = useState(initLoginOptions)
  const [isLoginInProgress, setIsLoginInProgress] = useState(false)
  const lastLoginTimeRef = useRef(0)

  const handleLogin = useEvent(async (item: LoginOption) => {
    const now = Date.now()
    if (
      isLoginInProgress ||
      now - lastLoginTimeRef.current < LOGIN_COOLDOWN_MS
    ) {
      return
    }

    lastLoginTimeRef.current = now

    if (showInModal) {
      recordEvent('login_modal_button_click', {})
    }

    if (item.key === 'nodemailer') {
      onEmailLoginSelect?.()
      router.navigate(FLOWROUTES.EMAIL_LOGIN)
      return
    }

    if (isWeb && !providers) {
      await refetchProviders()
      return
    }

    setIsLoginInProgress(true)
    setIsLoading(true)
    // if (isWeb) {
    //   const provider = providers?.[item.key as keyof Providers]
    //   if (!provider) {
    //     setIsLoginInProgress(false)
    //     throw new Error(`Provider ${item.key} not found`)
    //   }

    //   try {
    //     const csrfToken = await getCsrfToken()
    //     await openOAuth(provider, csrfToken)
    //     setIsLoginInProgress(false)
    //   } catch (err) {
    //     setIsLoginInProgress(false)
    //     throw err
    //   }
    // } else {
    try {
      const userData = await gotoLogin(item)
      if (!userData) {
        throw new Error('not implation')
      }

      submitUserAccount(item.key, userData, false)
        .then(() => {
          setIsLoading(false)
          setIsLoginInProgress(false)
        })
        .catch((err) => {
          Sentry.setExtras({
            function: 'submitUserAccount',
            providerAccountId: userData.providerAccountId,
          })
          setIsLoginInProgress(false)
          throw err
        })
    } catch (err: any) {
      const errorMessage = String(err.message ?? String(err))

      if (errorMessage) {
        toast.showTop('Login failed: ' + errorMessage)
      } else {
        toast.showTop('Login failed')
      }

      recordEvent('login_failed', {
        provider: item.key,
        message: errorMessage,
      })

      Sentry.captureException(err, {
        extra: {
          function: 'gotoLogin',
          provider: item.key,
          errorMessage,
        },
      })

      setIsLoading(false)
      setIsLoginInProgress(false)
    }
    // }
  })

  const { data: providers, refetch: refetchProviders } = useQuery({
    queryKey: ['providers'],
    queryFn: getProviders,
  })

  useWatch([providers], () => {
    if (providers) {
      const newLoginOptions = loginOptions.map((group) =>
        group.filter((item) => item.key in providers)
      )
      setLoginOptions(newLoginOptions)
    }
  })

  return (
    <View style={styles.chatHeaderContainer}>
      {loginOptions[0].map((item, index) => {
        const isAppleSignIn = item.key === 'apple'
        return (
          <LoginButton
            analyticsLabel={`login_card_item_${item.key}`}
            key={index}
            testID={`login_card_item_${item.key}`}
            style={[
              styles.itemView,
              {
                backgroundColor: isAppleSignIn
                  ? loginAppleItemBgColor
                  : disableButtonColor,
              },
            ]}
            onPress={() => handleLogin(item)}
          >
            <View style={styles.cardContainer}>
              {item?.icon}
              <Text
                style={[
                  styles.title,
                  {
                    color: isAppleSignIn ? itemTextColor : loginItemTextColor,
                  },
                ]}
              >
                {item?.title}
              </Text>
            </View>
          </LoginButton>
        )
      })}
      <TextDivider lineColor="#FFFFFF1A" text={t('or')} />
      <View style={styles.iconsView}>
        {loginOptions[1].map((item, index) => (
          <LoginButton
            analyticsLabel={`login_card_item_${item.key}`}
            key={index}
            testID={`login_card_item_${item.key}`}
            style={styles.iconItemView}
            onPress={() => handleLogin(item)}
          >
            <View style={[styles.icon, { backgroundColor: bgColor2 }]}>
              {item?.icon}
            </View>
            <Text style={[styles.iconTitle, { color: loginItemTextColor }]}>
              {item?.title}
            </Text>
          </LoginButton>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chatHeaderContainer: {
    gap: 12,
    paddingHorizontal: 15,
  },
  itemView: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
  },
  iconsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  iconItemView: {
    paddingHorizontal: 10,
    gap: 6,
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: descFontWeight,
  },
  iconTitle: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.8,
  },
  emailIcon: {
    width: 20,
    height: 20,
  },
})
