// import Bar from 'bar';
import { Container, Footer } from '@/components/common';
import { DefaultLayout } from '@/components/layouts';
import { PricingCardGroup } from '@/components/ui/Pricing';
import { getRencentTasks } from '@/server/task';
import type { NextPageWithLayout } from '@/types/app';

type IndexProps = {
    tasks: any[];
};

const HomePage: NextPageWithLayout<IndexProps> = props => {
    return (
        <Container>
            <div className="relative z-10 py-16 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl space-y-2 lg:max-w-none">
                        <h1 className="text-brand-900 text-base">Pricing</h1>
                        <h2 className="h1">Predictable pricing, no surprises</h2>
                        <p className="p text-lg">Start building for free, collaborate with a team, then scale to millions of users</p>
                    </div>
                </div>
            </div>
            <PricingCardGroup>
            </PricingCardGroup>
            <Footer />
        </Container>
    );
};

HomePage.getLayout = function getLayout(page: JSX.Element) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default HomePage;

export async function getServerSideProps() {
    try {
        const res = await getRencentTasks();
        return {
            props: {
                tasks: res.data,
            },
        };
    } catch (error) {
        return {
        };
    }
}
