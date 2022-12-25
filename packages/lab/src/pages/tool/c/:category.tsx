import { DefaultLayout } from '@/components/layouts';
import type { NextPageWithLayout } from '@/types/app';
import { useEffect, useState } from 'react';

const ToolCCategoryPage: NextPageWithLayout = (props) => {

    useEffect(() => {
    }, []);

    return (
        <div className="bg-gray-100 pt-10 pb-20">
            123
        </div>
    );
};

ToolCCategoryPage.getLayout = (page: JSX.Element) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default ToolCCategoryPage;
