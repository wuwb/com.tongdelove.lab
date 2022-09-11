import { Container } from '@/components/common';
import { DefaultLayout } from '@/components/layouts';
import { Link } from '@/components/ui';
import { subscribe, testSubscribe } from '@/services/freelancer';
import { useAppSelector } from '@/store/hooks';
import type { NextPageWithLayout } from '@/types/app';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useMutation } from '@tanstack/react-query';
import { InferGetServerSidePropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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

    const onSubmit = async (data) => {
        console.log(JSON.stringify(data, null, 4));

        if (!isLoggedIn) {
            /**
            // 弹出扫码登录，登录成功，
                // 可以切换用账号密码登录
            // 判断是否注册，已经注册，查询订阅信息，后返回
                // 没有注册，弹出绑定已有账号，或者创建新的账号
                    // 绑定已经账号，直接放回
                    // 创建新的账号，直接返回，
            */
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

    const handleTest = async (data) => {
        let result = await testSubscribe(data);
        console.log('result: ', result);
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

            <div className="grid grid-cols-5 gap-3">
                <div className="bg-blue-100 col-span-4 p-10">
                    <form>
                        <div className="mb-8 space-y-4">
                            {
                                sourceList.map(item => (
                                    <div key={item.id} className="">
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
                                <div className="space-x-4 mb-2">
                                    <span className="inline-block w-40">钉钉群机器人</span>



                                    <TextField id="outlined-basic" label="通知地址" variant="outlined"
                                        placeholder="群机器人的webhook地址"
                                        {...register("dingdingWebhook")} />
                                    <TextField id="outlined-basic" label="签名密钥" variant="outlined"
                                        placeholder="请填写签名校验的密钥串"
                                        {...register("dingdingSecret")} />
                                    <Link href="https://open.dingtalk.com/document/group/custom-robot-access">
                                        <QuestionMarkIcon />
                                    </Link>
                                </div>
                                <div className="space-x-4 mb-2">
                                    <span className="inline-block w-40">飞书群机器人</span>

                                    <TextField id="outlined-basic" label="通知地址" variant="outlined"
                                        placeholder="群机器人的webhook地址"
                                        {...register("feishuWebhook")} />
                                    <TextField id="outlined-basic" label="签名密钥" variant="outlined"
                                        placeholder="请填写签名校验的密钥串"
                                        {...register("feishuSecret")} />
                                    <Link href="https://www.feishu.cn/hc/zh-CN/articles/360024984973">
                                        <QuestionMarkIcon />
                                    </Link>
                                </div>
                                <div className="space-x-4 mb-2">
                                    <span className="inline-block w-40">企业微信群机器人</span>
                                    <TextField id="outlined-basic"
                                        label="通知地址" variant="outlined"
                                        placeholder="群机器人的webhook地址"
                                        {...register("wechatWebhook")} />
                                </div>
                                <div className="space-x-4 mb-2">
                                    <span className="inline-block w-40">PushDeer</span>
                                    <TextField id="outlined-basic" label="通知地址" variant="outlined"
                                        {...register("pushdeerWebhook")} />
                                </div>
                                <div className="space-x-4 mb-2">
                                    <span className="inline-block w-40">邮件</span>
                                    <TextField id="outlined-basic" label="邮箱地址" variant="outlined"
                                        {...register("email")} />
                                </div>
                            </div>
                            <div>
                                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                                    订阅通知
                                </Button>
                                <Button className="ml-2" variant="outlined" onClick={handleSubmit(handleTest)}>
                                    测试一下
                                </Button>
                            </div>
                        </div>
                    </form>

                    <div>
                        如果嫌配置机器人麻烦，可以加我的微信 wuxx2024，我拉你们到订阅群里，加我的时候备注"订阅任务"。
                    </div>

                </div>
                <div className="">
                    sidebar
                </div>
            </div>


        </Container>
    );
};

HomePage.getLayout = (page: JSX.Element) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default HomePage;

export const getServerSideProps = async (context) => {
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
    return {
        props: {},
    }
}
