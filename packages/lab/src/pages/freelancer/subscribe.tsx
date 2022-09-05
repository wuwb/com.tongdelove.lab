import React, { useState } from 'react';
import { Trans, useTranslation } from 'next-i18next';
import { DefaultLayout } from '@/components/layouts';
import { Header, Footer, Container } from '@/components/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { NextPageWithLayout } from '@/types/app';
import axios from '@/utils/axios';
import { InferGetServerSidePropsType } from 'next';
import { Link } from '@/components/ui';
import styles from './subscribe.module.scss';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Joi from 'joi';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { subscribe } from '@/services/freelancer';
import { useMutation } from '@tanstack/react-query';

interface Props {
    data: any;
};

const HomePage: NextPageWithLayout<Props> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log('props: ', props);
    const { t } = useTranslation();
    const user = useAppSelector((state) => state.auth.user);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const email = user?.email || '';

    const [data, setData] = useState("");

    const setFormOptions = {}

    const { register, handleSubmit, reset, formState } = useForm(setFormOptions)
    const { errors } = formState

    const { mutateAsync } = useMutation(subscribe);


    async function onSubmit(data) {
        console.log(JSON.stringify(data, null, 4));

        if (!isLoggedIn) {
            // 弹出扫码登录，登录成功，
            // 判断是否注册，已经注册，查询订阅信息，后返回
            // 没有注册，弹出绑定已有账号，或者创建新的账号
            // 创建新的账号，直接返回，
        }

        const result = await mutateAsync(
            {
                ...data,
            },
            {
                onError: (error: any) => {
                    toast.error(error.message);
                },
            }
        );


        return false
    }

    const sourceList = [
        {
            id: 'upwork',
            name: 'Upwork（www.upwork.com）',
        },
        {
            id: 'shixian',
            name: '实现（shixian.com）',
        },
        {
            id: 'mayigeek',
            name: '码易（www.mayigeek.com）',
        },
        {
            id: 'a5',
            name: 'A5任务（www.a5.cn）',
        },
        {
            id: 'rrkf',
            name: '人人开发（rrkf.com）',
        },
        {
            id: 'taskcity',
            name: '智城外包网（www.taskcity.com）',
        },
        {
            id: 'oschina',
            name: '开源众包（zb.oschina.net）'
        },
        {
            id: 'codemart',
            name: '码市（codemart.com）'
        },
        {
            id: 'yuanjisong',
            name: '猿急送（www.yuanjisong.com）'
        }
    ];

    return (
        <Container className="text-gray-800">
            <form>
                <div>
                    {
                        sourceList.map(item => (
                            <div>
                                <label key={item.id} className="form-check-label">
                                    <input
                                        type="checkbox"
                                        name="source"
                                        {...register('source')}
                                        id="source"
                                        value={item.id}
                                        className={`form-check-input`}
                                    />
                                    {item.name}
                                </label>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <div>
                        <div>
                            钉钉群机器人
                            <Link href="https://open.dingtalk.com/document/group/custom-robot-access">
                                <QuestionMarkIcon />
                            </Link>

                            <TextField id="outlined-basic" label="通知地址" variant="outlined"
                                placeholder="群机器人的webhook地址"
                                {...register("dingdingWebhook")} />
                            <TextField id="outlined-basic" label="签名密钥" variant="outlined"
                                placeholder="请填写签名校验的密钥串"

                                {...register("dingdingSecret")} />
                        </div>
                        <div>
                            飞书群机器人
                            <Link href="https://www.feishu.cn/hc/zh-CN/articles/360024984973">
                                <QuestionMarkIcon />
                            </Link>
                            <TextField id="outlined-basic" label="通知地址" variant="outlined"
                                placeholder="群机器人的webhook地址"
                                {...register("feishuWebhook")} />
                            <TextField id="outlined-basic" label="签名密钥" variant="outlined"
                                placeholder="请填写签名校验的密钥串"

                                {...register("feishuSecret")} />
                        </div>
                        <div>
                            企业微信群机器人
                            <TextField id="outlined-basic"
                                label="通知地址" variant="outlined"
                                placeholder="群机器人的webhook地址"
                                {...register("wechatWebhook")} />
                        </div>
                        <div>
                            PushDeer
                            <TextField id="outlined-basic" label="通知地址" variant="outlined"
                                {...register("pushdeerWebhook")} />
                        </div>
                        <div>
                            邮件
                            <TextField id="outlined-basic" label="邮箱地址" variant="outlined"
                                {...register("email")} />
                        </div>
                    </div>
                    <div>
                        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                            订阅通知
                        </Button>
                        <Button variant="outlined">
                            测试一下
                        </Button>
                    </div>
                </div>
            </form>

        </Container>
    );
};

HomePage.getLayout = (page: JSX.Element) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default HomePage;

// export const getServerSideProps = async (context) => {
//     try {
//         // 获取账号对应的订阅状态
//     } catch (error) {
//         console.error(error);
//         return {
//             props: {
//                 data: 0,
//             },
//         };
//     }
// }
