import { Container } from '@/components/common';
import { BaseLayout } from '@/components/layouts';
import { Link } from '@/components/ui';
import { Pagination } from '@/components/ui/Pagination';
import { parseSourceType } from '@/content/freelancer/interface';
import { useAppSelector } from '@/store/hooks';
import type { NextPageWithLayout } from '@/types/app';
import axios from '@/utils/axios';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface Props {
    data: any[];
    count: number;
}

const TasksPageIdPage: NextPageWithLayout<Props> = (props) => {
    const router = useRouter();
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const user = useAppSelector((state) => state.auth.user);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    const pageId = parseInt(router.query?.pageId as string || '1', 10);
    const pageSize = parseInt(router.query?.pageSize as string || '10', 10);

    // 页码错误返回第一页
    if (pageId < props.count) {
        router.replace('/freelancer/tasks/1');
    }

    const handlePrev = () => {
        if (pageId === 1) {
            return;
        }
        const num = pageId - 1;
        fetchData(pageSize, num);

        router.push(`/freelancer/tasks/${num}`)

    }
    const handleNext = () => {
        if (pageId >= Math.ceil(props.count / pageSize)) {
            return;
        }
        const num = pageId + 1;
        fetchData(pageSize, num);
        router.push(`/freelancer/tasks/${num}`)
    }
    const handleTo = (num) => {
        if (num === pageId) {
            return;
        }
        fetchData(pageSize, num);
        router.push(`/freelancer/tasks/${num}`)
    }
    const fetchData = async (pageSize, pageId) => {
        try {
            const { data } = await axios.get(`/freelancer/tasks?pageSize=${pageSize}&page=${pageId}`)
            setData(data.data.data);
            setCount(data.data.count);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData(pageSize, pageId);
    }, []);

    return (
        <div className="bg-gray-100 pt-10 pb-20">
            <Container className="">
                <div className="grid grid-cols-5 gap-3">
                    <div className="col-span-4">
                        <div className="px-3 lg:px-0 my-3 flex flex-row items-center justify-between">
                            <div className="text-base lg:text-xl font-medium">今天</div>
                        </div>
                        <div className="bg-white lg:rounded-lg">

                            {data.map((item) => (
                                <div key={item.id} className={cx(styles['task-item'], "cursor-pointer lg:h-120px border-gray-200 hover:bg-gray-50 relative")}>
                                    <Link className="flex flex-col p-3 lg:p-20px pr-18 lg:pr-104px group" href={item.url}>
                                        <div className="m-0 lg:font-light text-base lg:text-xl text-gray-700 flex flex-row items-center">
                                            <span className="m-0 lg:font-light text-base lg:text-xl text-gray-700 flex flex-row items-center">{item.title}</span>
                                            <div className="hidden lg:flex flex-row items-center"><svg className="ml-2 mr-1 fill-current text-white group-hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10 3v2H5v14h14v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6zm7.586 2H13V3h8v8h-2V6.414l-7 7L10.586 12l7-7z"></path></svg><span className="text-white group-hover:text-gray-600 text-sm">访问源站</span></div>
                                        </div>
                                        <div className="text-pink-700 text-xl">￥{item.fixedPrice}</div>
                                        <div className="text-gray-500 font-normal">{item.desc}</div>
                                        <div className="flex gap-2 text-gray-600 text-sm">
                                            <span>项目类型： {item.type}</span> |
                                            {/* <span>发布时间：{format(new Date(item.time), 'yyyy-MM-dd HH:mm')}</span> */}
                                        </div>
                                        <div className="flex gap-2 text-gray-600 text-sm">
                                            <div>开发周期：{item.cycle} {item.cycleName}</div> |
                                            <div>{item.bargain ? '可议价' : '固定价格'}</div> |

                                            <div>来源：{parseSourceType(item.source)}</div> |

                                            <div>状态：{item.status}</div> |
                                            <div>申请人数：{item.applyCount}</div> |
                                            <div>查看次数：{item.visitCount}</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                            <Pagination postsPerPage={10}
                                totalPosts={count}
                                paginatePrev={handlePrev}
                                paginateNext={handleNext}
                                handleTo={handleTo}
                                currentPage={+pageId} />
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <div className="text-base font-medium py-2">热门标签</div>
                            <div className="bg-white rounded-lg">
                                <div className="border-b border-gray-200 p-3 flex flex-row items-center">
                                    <div className="w-10 h-10 rounded mr-3"></div>
                                    <div className="flex flex-col">
                                        <div className="text-base mb-1">技术</div>
                                        <div className="text-xs text-gray-400">收录 32053 个产品</div>
                                    </div>
                                </div>
                                <div className="text-center text-sm p-2">查看更多</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

TasksPageIdPage.getLayout = (page: JSX.Element) => {
    return <BaseLayout>{page}</BaseLayout>;
};

export default TasksPageIdPage;

// export const getStaticPaths = async () => {
//     // 请求接口获取页数
//     return {
//         paths: [
//             { params: { pageId: '1' } },
//         ],
//         fallback: true, // false or "blocking" // See the "fallback" section below
//     };
// }

// export const getStaticProps = async (context) => {
//     try {
//         const page = context.params.pageId || 1;
//         const pageSize = context.query?.pageSize || 10;
//         const { data } = await axios.get(`/freelancer/tasks?pageSize=${pageSize}&page=${page}`)
//         return {
//             props: {
//                 ...data.data
//             },
//             // Re-generate the post at most once per second
//             // if a request comes in
//             revalidate: 1,
//         };
//     } catch (error) {
//         return {
//             props: {
//                 data: [],
//                 count: 0,
//             },
//         };
//     }
// }
