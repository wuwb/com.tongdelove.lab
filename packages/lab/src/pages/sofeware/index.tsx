import * as React from 'react';
import { Settings } from '@/content/etf-grid/Settings';
import { Grids } from '@/content/etf-grid/Grids';
import { AppContext, reducer, initialState } from '@/common/store';
import { useRouter } from 'next/router';
import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SwitchLang from '@/components/common/SwitchLang';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Head from 'next/head';

function SofewarePage(): any {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const router = useRouter()
    const { t } = useTranslation()

    return (
        <>
            <Head>
                <title>软件推荐</title>
            </Head>
            <div className="p-2 box max-w-screen-lg mx-auto">
                Tuxera Disk Manager

                ZeroTier
            </div>
            <div>
                论坛
                https://github.com/flarum/flarum/

                网盘
                https://github.com/Xhofe/alist
            </div>
        </>
    );
}

export default SofewarePage;

export async function getServerSideProps({ locale, defaultLocale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}
