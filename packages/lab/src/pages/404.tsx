import {
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  styled
} from '@mui/material';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import type { ReactElement } from 'react';
import { BaseLayout } from '@/components/layouts';
import { useTranslation } from 'react-i18next';
import { Divider } from '@/components/ui';

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `
);

function Status404(): any {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Head>
        <title>Status - 404</title>
      </Head>
      <div className="h-full flex flex-1 flex-col">
        <div className="flex flex-1 w-full align-center justify-center p-6">
          <div>
            <div className="text-center">
              <img alt="404" height={180} src="/static/images/status/404.svg" />
              <h2>
                {t("The page you were looking for doesn't exist.")}
              </h2>
              <h4>
                {t(
                  "It's on us, we moved the content to a different page. The search below should help!"
                )}
              </h4>
            </div>
            <div className="bg-white">
              <div className="text-center mt-3 p-4">
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    className="bg-white"
                    type="text"
                    placeholder={t('Search terms here...')}
                    endAdornment={
                      <InputAdornment position="end">
                        <ButtonSearch variant="contained" size="small">
                          {t('Search')}
                        </ButtonSearch>
                      </InputAdornment>
                    }
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchTwoToneIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Divider>OR</Divider>
                <Button href="/" variant="outlined">
                  {t('Go to homepage')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Status404;

Status404.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
