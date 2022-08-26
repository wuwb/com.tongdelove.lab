import React from 'react';
import Bar from 'bar';
import Router from "next/router";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { FooterCopyright } from './FooterCopyright';
import { FooterIconList } from './FooterIconList';

export function Copyright(props: any) {
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

export function Footer(props): any {
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
    return (
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
    );
}


type ICenteredFooterProps = {
    logo: ReactNode;
    iconList: ReactNode;
    children: ReactNode;
};

export const CenteredFooter = (props: ICenteredFooterProps) => (
    <div className="text-center">
        {props.logo}

        <nav>
            <ul className="navbar mt-5 flex flex-row justify-center font-medium text-xl text-gray-800">
                {props.children}
            </ul>
        </nav>

        <div className="mt-8 flex justify-center">
            <FooterIconList>{props.iconList}</FooterIconList>
        </div>

        <div className="mt-8 text-sm">
            <FooterCopyright />
        </div>

        <style jsx>
            {`
          .navbar :global(li) {
            @apply mx-4;
          }
        `}
        </style>
    </div>
);
