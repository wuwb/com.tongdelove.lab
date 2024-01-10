import { useTranslation } from 'next-i18next';
import Image from 'next/legacy/image';
import { Container, Footer } from '@/components/common';
import { BaseLayout } from '@/components/layouts';
import { NextPageWithLayout } from '@/types/app';
import { Box } from '@mantine/core'

import { ReactNode } from 'react';

type IndexProps = {
};

const ToolCard: React.FC<{
    title: string;
    image?: ReactNode,
    index: number;
    desc: string;
    href: string;
}> = ({ title, image, href, index, desc }) => {
    return (
        <Box
            sx={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 4px 0 rgba(35,49,128,0.02), 0 4px 8px 0 rgba(49,69,179,0.02)',
                borderRadius: '8px',
                fontSize: '14px',
                color: 'rgba(0,0,0,0.65)',
                textAlign: 'justify',
                lineHeight: ' 22px',
                padding: '16px 19px',
                flex: 1,
                '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: 48,
                        height: 48,
                        lineHeight: '22px',
                        backgroundSize: '100%',
                        textAlign: 'center',
                        padding: '8px 16px 16px 12px',
                        color: '#FFF',
                        fontWeight: 'bold',
                        backgroundImage:
                            "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
                    }}
                >
                    {index ? image : index}
                </div>
                <div
                    style={{
                        fontSize: '16px',
                        color: 'rgba(0, 0, 0, 0.85)',
                        paddingBottom: 8,
                    }}
                >
                    {title}
                </div>
            </div>
            <div
                style={{
                    fontSize: '14px',
                    color: 'rgba(0,0,0,0.65)',
                    textAlign: 'justify',
                    lineHeight: '22px',
                    marginBottom: 8,
                }}
            >
                {desc}
            </div>
            <a href={href} target="_blank" rel="noreferrer">
                了解更多 {'>'}
            </a>
        </Box>
    );
}

const ToolPage: NextPageWithLayout<IndexProps> = (props) => {
    return (
        <Container>
            <Box
                sx={{
                    width: '100%',
                    padding: '12px',
                    '&:hover': {

                    },
                }}
            >
                <div
                    style={{
                        fontSize: '20px',
                        color: '#1A1A1A',
                    }}
                >
                    欢迎使用 Ant Design Pro
                </div>
                <p
                    style={{
                        fontSize: '14px',
                        color: 'rgba(0,0,0,0.65)',
                        lineHeight: '22px',
                        marginTop: 16,
                        marginBottom: 32,
                        width: '65%',
                    }}
                >
                    Ant Design Pro 是一个整合了 umi，Ant Design 和 ProComponents
                    的脚手架方案。致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。
                </p>
                <div style={{ display: 'flex', gap: 16 }}>
                    <ToolCard
                        index={1}
                        image={(
                            <Image
                                src="/images/placeholder/80x80?text=80x80&fg=666666&bg=cccccc"
                                width="80"
                                height="80"
                                alt="节日头像制作"
                            />
                        )}
                        href="https://umijs.org/docs/introduce/introduce"
                        title="节日头像制作"
                        desc="节日头像制作，国庆节、圣诞节、春节头像"
                    />
                    <ToolCard
                        index={1}
                        href="https://umijs.org/docs/introduce/introduce"
                        title="ETF 网格"
                        desc="ETF 网格是一个用来辅助基金投资决策的工具"
                    />
                    <ToolCard
                        index={1}
                        href="https://umijs.org/docs/introduce/introduce"
                        title="了解 umi"
                        desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"
                    />
                    <ToolCard
                        index={1}
                        href="https://umijs.org/docs/introduce/introduce"
                        title="了解 umi"
                        desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"
                    />
                </div>
            </Box>
            <div>
                广告
            </div>
        </Container>
    );
};

ToolPage.getLayout = function getLayout(page: JSX.Element) {
    return <BaseLayout>{page}</BaseLayout>;
};

export default ToolPage;
