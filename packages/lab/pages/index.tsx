import Bar from 'bar'
import Router from "next/router";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fork from '@/components/demo/Fork';
import AccentSidebarLayout from '@/components/layouts/AccentSidebarLayout';
import { HtmlMeta } from '@/components/common';
import { Home } from '@/content/home/Home/Home';
import { pkg } from '@/configs';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function HomePage(props) {
    const footers = [
        {
            title: 'Company',
            description: ['Team', 'History', 'Contact us', 'Locations'],
        },
        {
            title: 'Features',
            description: [
                'Cool stuff',
                'Random feature',
                'Team feature',
                'Developer stuff',
                'Another one',
            ],
        },
        {
            title: 'Resources',
            description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
        },
        {
            title: 'Legal',
            description: ['Privacy policy', 'Terms of use'],
        },
    ];

    const handleRedirectToDashboards = () => {
        Router.push("/admin/dashboard");
    }

    return (
        <div>
            <HtmlMeta title={pkg.name} disableSiteName />

            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        吴文斌
                    </Typography>
                    <nav>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="#"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Features
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="/etf-grid"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            ETF 网格工具
                        </Link>
                        <Button onClick={handleRedirectToDashboards} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                            Dashboards
                        </Button>
                    </nav>
                    <Fork stars={props.stars} />
                    <Button href="/user/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">

                <Home />

                {/* <Breadcrumb /> */}

                {/* <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Pricing
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p">
                        Quickly build an effective pricing table for your potential customers with
                        this layout. It&apos;s built with default MUI components with little
                        customization.
                    </Typography>
                </Container> */}

                <Bar />
                <Button variant="contained">你好，世界</Button>
                <Box
                    sx={{
                        my: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        MUI v5 + Next.js with TypeScript example
                    </Typography>
                </Box>
                <div className="text-lg bg-red-500">
                    tailwind test
                </div>
                <Container
                    maxWidth="md"
                    component="footer"
                    sx={{
                        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                        mt: 8,
                        py: [3, 6],
                    }}
                >
                    <Grid container spacing={4} justifyContent="space-evenly">
                        {footers.map((footer) => (
                            <Grid item xs={6} sm={3} key={footer.title}>
                                <Typography variant="h6" color="text.primary" gutterBottom>
                                    {footer.title}
                                </Typography>
                                <ul>
                                    {footer.description.map((item) => (
                                        <li key={item}>
                                            <Link href="#" variant="subtitle1" color="text.secondary">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        ))}
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                </Container>

                {/* <CoverFlowImages images={[
                    "/demo/demo-editor.jpg",
                    "/demo/demo-filemanager.png",
                ]} /> */}

            </Container>
        </div>
    );
}

HomePage.getLayout = function getLayout(page) {
    return <AccentSidebarLayout>{page}</AccentSidebarLayout>;
}

export default HomePage;

export async function getServerSideProps() {
    try {
        const res = await fetch(
            // 'https://api.github.com/repos/wuwb/wuwb.github.io',
            'https://api.github.com/repos/huydhoang/next-mui-emotion',
        )
        const json = await res.json()

        return {
            props: {
                stars: json.stargazers_count,
            },
        }
    } catch (error) {
        return {
            props: {
                stars: 0,
            },
        }
    }
}
