import axios from '@/utils/axios'
import { AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

export type SubscribeParama = {
  source: any
  dingdingWebhook: string
  dingdingSecret: string
  feishuWebhook: string
  feishuSecret: string
  wechatWebhook: string
  pushdeerWebhook: string
  email: string
}
export async function subscribe(params: SubscribeParama) {
  const data = await axios.post<void, AxiosResponse<void>, SubscribeParama>('/freelancer/subscribe', params)

  toast.success('订阅成功')
}

export async function testSubscribe(params: SubscribeParama) {
  await axios.post<void, AxiosResponse<void>, SubscribeParama>('/freelancer/subscribe-test', params)

  toast.success('订阅测试已发送')
}
