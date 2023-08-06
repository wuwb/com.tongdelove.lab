import {
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  styled
} from '@mui/material';
import Image from 'next/legacy/image';
import React from 'react';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useTranslation } from 'next-i18next';
import { Metadata } from 'next';

const ButtonSearch = styled(Button)(
  ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `
);

export const metadata: Metadata = {
  title: 'Status - 404',
}

function Status404(): any {
  const { t }: { t: any } = useTranslation();

  return (
    <div className="h-full flex flex-1 flex-col">
      <div className="flex flex-1 w-full align-center justify-center p-6">
        <div>
          <div className="text-center">
            <Image alt="404" height={180} width={180} src="/images/status/404.svg" />
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
              <Button href="/" variant="outlined">
                {t('Go to homepage')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status404;
