import { SubscribeInfo, Subscription } from '@/types/subscribe'
import { BOOST_PACK_CREDITS, BOOST_PACK_EXPIRE } from '@/utils/constants/user'

export const subscribeInfo: Record<string, Subscription> = {
  free: {
    title: 'Free',
    description: 'Begin Your Exploration Journey',
    amount: 0,
    expireType: 'day',
    possess: [
      `${
        process.env.NEXT_PUBLIC_COMMON_USER_DAILY_LIMIT_STR || '10'
      } free credits per day`,
      'Optional credits purchase',
    ],
  },
  membership: {
    isPopular: true,
    title: 'Premium',
    description: '50x more credits than Free version',
    amount: 4.99,
    expireType: 'month',
    possess: [
      'Up to 500 credits per day',
      'Optional credits purchase',
      'Early access to new features',
    ],
    buttonText: 'Upgrade Now',
    mainClassName: 'purple-500',
    buttonClassName: 'bg-gradient-to-r from-pink-500 to-purple-500',
  },
  boostPack: {
    title: 'Boost Pack',
    description: 'Enough for a worry-free week',
    amount: Number(process.env.NEXT_PUBLIC_BOOST_PACK_PRICE || '0'),
    // expireType: "",
    possess: [
      'One-off buy',
      `${BOOST_PACK_CREDITS || '100'} credits ${
        BOOST_PACK_EXPIRE / 3600 / 24
      }-day validity`,
      'No auto-renewal after expiry',
    ],
    buttonText: `Get ${BOOST_PACK_CREDITS || '100'} credits`,
  },
}
