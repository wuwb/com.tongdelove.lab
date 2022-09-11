import { useTranslation } from 'next-i18next';
// import Bar from 'bar';
import { Container } from '@/components/common';
import { DefaultLayout } from '@/components/layouts';
import { Link } from '@/components/ui';
import { Pagination } from '@/components/ui/Pagination';
import { useAppSelector } from '@/store/hooks';
import type { NextPageWithLayout } from '@/types/app';
import axios from '@/utils/axios';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

interface Props {
    data: any[];
    count: number;
};

const TasksPageIdPage: NextPageWithLayout<Props> = (props) => {
    const router = useRouter();
    const { t } = useTranslation();

    const { data } = props;
    let pageId = parseInt(router.query?.pageId as string || '1', 10);
    let pageSize = parseInt(router.query?.pageSize as string || '10', 10);

    const user = useAppSelector((state) => state.auth.user);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    // 页码错误返回第一页
    if (pageId < props.count) {
        router.replace('/freelancer/tasks/1');
    }

    const handlePrev = () => {
        if (pageId === 1) {
            return;
        }
        let num = pageId - 1;
        router.push(`/freelancer/tasks/${num}`)

    }
    const handleNext = () => {
        if (pageId >= Math.ceil(props.count / pageSize)) {
            return;
        }
        let num = pageId + 1;
        router.push(`/freelancer/tasks/${num}`)
    }
    const handleTo = (num) => {
        if (num === pageId) {
            return;
        }
        router.push(`/freelancer/tasks/${num}`)
    }

    return (
        <Container className="text-gray-800">
            <div className="grid grid-cols-5 gap-3">
                <div className="bg-blue-100 col-span-4">
                    <div className="p-10">
                        {data.map((item) => (
                            <div key={item.id} className="mb-10">
                                <Link href={item.url}>
                                    <div>
                                        <span className="font-bold">{item.title}</span>
                                        <span className="text-pink-700 text-xl">￥{item.price}</span>
                                    </div>

                                    <div>{item.content}</div>
                                    <div className="flex gap-2 text-gray-600 text-sm">
                                        <span>项目类型： {item.type}</span> |
                                        <span>发布时间：{format(new Date(item.time), 'yyyy-MM-dd HH:mm')}</span>
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

                        <Pagination postsPerPage={10}
                            totalPosts={props.count}
                            paginatePrev={handlePrev}
                            paginateNext={handleNext}
                            handleTo={handleTo}
                            currentPage={+pageId} />
                    </div>
                </div>
                <div className="bg-red-100 ">
                    sidebar
                </div>
            </div>
        </Container>
    );
};

TasksPageIdPage.getLayout = (page: JSX.Element) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default TasksPageIdPage;

export const getStaticPaths = async () => {
    // 请求接口获取页数
    return {
        paths: [
            { params: { pageId: '1' } },
            { params: { pageId: '2' } },
            { params: { pageId: '3' } },
        ],
        fallback: true, // false or "blocking" // See the "fallback" section below

    };
}

export const getStaticProps = async (context) => {
    try {
        console.log('context: ', context);
        const page = context.params.pageId || 1;
        const pageSize = context.query?.pageSize || 10;
        const { data } = await axios.get(`/freelancer/tasks?pageSize=${pageSize}&page=${page}`)
        console.log('data: ', data.data);
        return {
            props: {
                ...data.data
            },
            // Re-generate the post at most once per second
            // if a request comes in
            // revalidate: 1,
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                data: [],
                count: 0,
            },
        };
    }
}
