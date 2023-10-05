import { type ReactNode } from 'react'
import {
  Box,
  Flex,
  Button,
  Text,
  Container,
  Input,
  Textarea,
  Stack,
  Grid,
  VisuallyHidden,
} from '@mantine/core';

import { IconBrandMantine, IconBrandTwitterFilled, IconBrandYoutubeFilled, IconBrandInstagram } from '@tabler/icons-react';

// import { AppStoreBadge } from '/components/AppStoreBadge'
// import { PlayStoreBadge } from '#/components/PlayStoreBadge'

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text mb={2}>
      {children}
    </Text>
  )
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <Button
      w={8}
      h={8}
      display={'inline-flex'}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  )
}

export function Footer() {
  return (
    <Box>
      <Container py={10}>
        <Grid columns={12} gutter={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Box>
              About Us
            </Box>
            <Box>
              Blog
            </Box>
            <Box>
              Careers
            </Box>
            <Box>
              Contact Us
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Box>
              Help Center
            </Box>
            <Box>
              Safety Center
            </Box>
            <Box>
              Community Guidelines
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Box>
              Cookies Policy
            </Box>
            <Box>
              Privacy Policy
            </Box>
            <Box>
              Terms of Service
            </Box>
            <Box>
              Law Enforcement
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>关注我</ListHeader>
            {/* <AppStoreBadge /> */}
            {/* <PlayStoreBadge /> */}
          </Stack>
        </Grid>
      </Container>

      <Box>
        <Container py={4}>
          <Text>© 2022 Tongde Tech. All rights reserved</Text>
          <Stack>
            <SocialButton label={'Twitter'} href={'#'}>
              <IconBrandTwitterFilled />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <IconBrandYoutubeFilled />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <IconBrandInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
