// import Bar from 'bar';
import { Container } from '@/components/common';
import { DefaultLayout } from '@/components/layouts';
import { useAppSelector } from '@/store/hooks';
import type { NextPageWithLayout } from '@/types/app';
import { InferGetServerSidePropsType } from 'next';

interface Props {
    data: any;
};

const HomePage: NextPageWithLayout<Props> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <Container className="text-gray-800">
            <div>
                <h3>国外</h3>
                <ul>
                    <li>https://www.toptal.com/</li>
                    <li>https://www.upwork.com/</li>
                </ul>
            </div>
            <div>
                <h3>国内</h3>
                <div>开放接单平台</div>
                <ul>
                    <li></li>
                </ul>
                <div>项目分配接单平台</div>
                <ul>
                    <li>飞猿 www.freetalen.com</li>
                    <li>程序员客栈</li>
                </ul>
            </div>
        </Container>
    );
};

HomePage.getLayout = (page: JSX.Element) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default HomePage;

