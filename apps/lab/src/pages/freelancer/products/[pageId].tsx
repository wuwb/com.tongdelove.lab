import { BaseLayout } from '@/components/layouts';
import type { NextPageWithLayout } from '@/types/app';
import { useEffect, useState } from 'react';

const ProductsPageIdPage: NextPageWithLayout = (props) => {

    useEffect(() => {
    }, []);

    return (
        <div className="bg-gray-100 pt-10 pb-20">
            123
        </div>
    );
};

ProductsPageIdPage.getLayout = (page: JSX.Element) => {
    return <BaseLayout>{page}</BaseLayout>;
};

export default ProductsPageIdPage;
