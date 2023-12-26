import { BaseLayout } from '@/components/layouts';
import type { NextPageWithLayout } from '@/types/app';
import { useEffect, useState } from 'react';

const ToolCCategoryPage: NextPageWithLayout = (props) => {

    useEffect(() => {
    }, []);

    return (
        <div className=" pt-10 pb-20">
            123
        </div>
    );
};

ToolCCategoryPage.getLayout = (page: JSX.Element) => {
    return <BaseLayout>{page}</BaseLayout>;
};

export default ToolCCategoryPage;
