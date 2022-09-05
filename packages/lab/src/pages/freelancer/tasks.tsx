import React from 'react';
import { Trans, useTranslation } from 'next-i18next';
// import Bar from 'bar';
import { DefaultLayout } from '@/components/layouts';
import { Home } from '@/content/home/Home';
import { Header, Footer, Container } from '@/components/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { NextPageWithLayout } from '@/types/app';
import axios from '@/utils/axios';
import { InferGetServerSidePropsType } from 'next';
import { Link } from '@/components/ui';
import styles from './tasks.module.scss';

interface Props {
    data: any;
};

const HomePage: NextPageWithLayout<Props> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log('props: ', props);
    const { t } = useTranslation();
    const user = useAppSelector((state) => state.auth.user);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const email = user?.email || '';

    return (
        <Container className="text-gray-800">
            <div>
                {props.data.map((item) => (
                    <div key={item.id} className="mb-5">
                        <Link href={item.url}>
                            <div>
                                <span className="font-bold">{item.title}</span>
                                <span className="text-pink-700 text-xl">￥{item.price}</span>
                            </div>

                            <div>{item.content}</div>
                            <div>
                                <span>{item.type}</span>
                                <span>{item.time}</span>
                            </div>
                            <div className="flex gap-2 text-gray-600 text-sm">
                                <div>开发周期：{item.duration}</div> |
                                <div>{item.bargain ? '可议价' : '固定价格'}</div> |

                                <div>来源：{item.origin}</div> |

                                <div>状态：{item.status}</div> |
                                <div>申请人数：{item.applyCount}</div> |
                                <div>查看次数：{item.visitCount}</div> |

                                <div>开发类型：{item.developerType}</div> |
                                <div>需求角色：{item.specificRole}</div>
                            </div>
                        </Link>
                    </div>
                ))}
                {props.count}
            </div>
            <div>

            </div>
        </Container>
    );
};

HomePage.getLayout = (page: JSX.Element) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default HomePage;

export const getServerSideProps = async (context) => {
    try {
        const { data } = await axios.get('/freelancer/tasks')
        console.log('data: ', data.data);
        return {
            props: {
                ...data.data
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                data: 0,
            },
        };
    }
}
