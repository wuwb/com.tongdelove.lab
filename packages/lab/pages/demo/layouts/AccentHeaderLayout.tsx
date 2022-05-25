import Bar from 'bar'
import * as React from 'react';
import ReactDOM from 'react-dom';
import AccentHeaderLayout from '@/components/layouts/AccentHeaderLayout';

function Home({ stars }) {
    return (
        <div>
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
                    </nav>
                    <Fork stars={stars} />
                    <SwitchLang />
                    <Button href="/user/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">
                <Breadcrumb />

                {/* Hero unit */}
                <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
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
                </Container>

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

Home.getLayout = (page) => {
    return (
        <AccentHeaderLayout>
            {page}
        </AccentHeaderLayout>
    )
}

export default Home;
