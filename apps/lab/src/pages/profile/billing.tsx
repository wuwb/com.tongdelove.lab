import { BillingForm } from '@/components/BillingPage/BillingForm'
// import { getUserSubscriptionPlan } from '@/lib/lemonsqueezy/subscription'
import { useUserStore } from '@/stores'
import { SubScriptionInfo, UserSubscriptionPlan } from '@/types/subscribe'
import { subscribeInfo } from '@/utils/constants/subscribe'
import { MEMBERSHIP_ROLE_VALUE } from '@/utils/constants/user'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const Billing = () => {
  const { data: session } = useSession()
  const userData = useUserStore((store) => store.userData)
  const [subscriptionPlan, setSubscriptionPlan] =
    useState<UserSubscriptionPlan>({
      role: 0,
      isPro: false,
      name: 'Free',
      description: subscribeInfo.free?.description ?? '',
      subscriptionId: '',
      membershipExpire: 0,
      customerId: '',
      variantId: 0,
      isCanceled: true,
      updatePaymentMethodURL: '',
    })

  // const requestData = async () => {

  //   const subscription: SubScriptionInfo | null = await getUserSubscriptionPlan(
  //     {
  //       userId: session?.user.id,
  //     }
  //   )

  //   if (subscription) {
  //     setSubscriptionPlan({
  //       role: subscription.role,
  //       isPro: subscription.role === MEMBERSHIP_ROLE_VALUE,
  //       name: subscription.role === MEMBERSHIP_ROLE_VALUE ? 'PRO' : 'Free',
  //       description:
  //         (subscription.role === MEMBERSHIP_ROLE_VALUE
  //           ? subscribeInfo.membership?.description
  //           : subscribeInfo.free?.description) ?? '',
  //       subscriptionId: subscription.subscriptionId,
  //       membershipExpire: subscription.membershipExpire,
  //       customerId: subscription.customerId,
  //       variantId: subscription.variantId,
  //       isCanceled: subscription.isCanceled,
  //       updatePaymentMethodURL: subscription.updatePaymentMethodURL,
  //     })
  //   }
  // }

  useEffect(() => {
    // requestData()
  }, [])

  if (!session?.user.id) {
    // login first
    return
  }

  return (
    <div>
      <BillingForm
        subscriptionPlan={{
          ...subscriptionPlan,
        }}
        user={userData}
      />
    </div>
  )
}

export default Billing
