import React from 'react'
import { Loader, Button } from '@mantine/core'
import toast, { Toaster } from 'react-hot-toast'
import { axios } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { Res } from '@/types/request'
import { UserSubscriptionPlan } from '@/types/subscribe'
import { UserInfo } from '@/types/user'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan
  user: UserInfo
}

export function BillingForm({
  subscriptionPlan,
  user,
  className,
}: BillingFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function updatePayment(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(!isLoading)
    if (subscriptionPlan.isPro && subscriptionPlan.updatePaymentMethodURL) {
      window.location.href = subscriptionPlan.updatePaymentMethodURL
    }
  }
  async function upgrade(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(!isLoading)
    router.push('/sticker/price')
  }
  async function cancelSubscription() {
    console.log('cancel subscription', subscriptionPlan)
    if (!subscriptionPlan) {
      toast.error('subscriptionId not found')
      return
    }
    if (!subscriptionPlan.subscriptionId) {
      toast.error('subscriptionId not found')
      return
    }
    if (!subscriptionPlan.isPro) {
      toast.error("you don't have a subscription")
      return
    }
    if (subscriptionPlan.isCanceled) {
      toast.error('subscription already canceled')
      return
    }
    try {
      const res = await axios.delete<any, Res>('/api/payment/subscribe', {
        headers: {
          token: user.accessToken,
        },
      })
      if (res.code === 200) {
        router.replace('')
        return
      }
      toast.error('something wrong')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={cn(className)}>
      <div>
        <div>
          <div>Subscription Plan</div>
          <div>
            You are currently on the <strong>{subscriptionPlan.name}</strong>{' '}
            plan.
          </div>
        </div>
        <div>{subscriptionPlan.description}</div>
        <div className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <div className="flex gap-4">
            {subscriptionPlan.isPro ? (
              <Button onClick={updatePayment}>
                {isLoading && (
                  <Loader color="blue" className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Payment
              </Button>
            ) : (
              <Button onClick={upgrade}>
                {isLoading && (
                  <Loader color="blue" className="mr-2 h-4 w-4 animate-spin" />
                )}
                Upgrade to PRO
              </Button>
            )}
            {subscriptionPlan.isCanceled ? (
              <></>
            ) : (
              <div>
                <div>
                  <Button variant="destructive">Unsubscribe</Button>
                </div>
                <div>
                  <div>
                    <div>Are you absolutely sure?</div>
                    <div>
                      After unsubscribing, you will lose your current privileges
                      once your current subscription expires.
                    </div>
                  </div>
                  <div>
                    <div>Close Dialog</div>
                    <div onClick={cancelSubscription}>Unsubscribe</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {subscriptionPlan.isPro ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? 'Your plan will be canceled on '
                : 'Your plan renews on '}
              {dayjs(subscriptionPlan.membershipExpire).format(
                'YYYY-MM-DD HH:mm'
              )}
              .
            </p>
          ) : null}
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  )
}
