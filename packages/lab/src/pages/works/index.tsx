import { useTranslation } from 'next-i18next';
import { Container, Footer } from '@/components/common';
import { DefaultLayout } from '@/components/layouts';
import { Link } from '@/components/ui';
import { useAppSelector } from '@/store/hooks';
import type { NextPageWithLayout } from '@/types/app';
import { useState } from 'react';

type IndexProps = {
    tasks: any[];
};

const Page: NextPageWithLayout<IndexProps> = props => {

    const [works, setWorks] = useState();

    return (
        <Container>
            <Footer />
        </Container>
    );
};

Page.getLayout = function getLayout(page: JSX.Element) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default Page;

