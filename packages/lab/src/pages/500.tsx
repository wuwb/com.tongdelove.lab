// pages/500.js
import React from 'react';
import { BaseLayout } from '@/components/layouts';

export default function Custom500(): any {
    return <h1>500 - Server-side error occurred</h1>
}

Custom500.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
