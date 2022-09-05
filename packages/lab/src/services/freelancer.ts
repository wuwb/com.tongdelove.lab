import axios from '@/utils/axios';
import { store } from '@/store';
import { setAccessToken, setUser } from '@/store/authSlice';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';

export type SubscribeParama = {
  source: any;
  dingdingWebhook: string;
  dingdingSecret: string;
  feishuWebhook: string;
  feishuSecret: string;
  wechatWebhook: string;
  pushdeerWebhook: string;
  email: string;
};
export async function subscribe(params: SubscribeParama) {
  const data = await axios.post<void, AxiosResponse<void>, SubscribeParama>('/freelancer/subscribe', params);

  toast.success('订阅成功');
}


export async function subscribeTest(params) {
  await axios.post<void, AxiosResponse<void>, SubscribeParama>('/freelancer/subscribe-test', params);

  toast.success('订阅测试已发送');
}
