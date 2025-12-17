import { useTranslation } from '@/i18n'
import { Button } from '@tongdelove/ui/components/button'

export const HowToUse = () => {
  const { t } = useTranslation()

  const codeToCopy = `<link rel="apple-touch-icon" sizes="57x57" href="/favicon-57x57.png" type="image/png" />
<link rel="apple-touch-icon" sizes="60x60" href="/favicon-60x60.png" type="image/png" />
<link rel="apple-touch-icon" sizes="72x72" href="/favicon-72x72.png" type="image/png" />
<link rel="apple-touch-icon" sizes="114x114" href="/favicon-114x114.png" type="image/png" />
<link rel="apple-touch-icon" sizes="120x120" href="/favicon-120x120.png" type="image/png" />
<link rel="apple-touch-icon" sizes="144x144" href="/favicon-144x144.png" type="image/png" />
<link rel="apple-touch-icon" sizes="152x152" href="/favicon-152x152.png" type="image/png" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
<link rel="icon" sizes="16x16" href="/favicon-16x16.png" type="image/png" />
<link rel="icon" sizes="32x32" href="/favicon-32x32.png" type="image/png" />
<link rel="icon" sizes="96x96" href="/favicon-96x96.png" type="image/png" />
<link rel="icon" sizes="192x192" href="/favicon-192x192.png" type="image/png" />
<link rel="icon" sizes="512x512" href="/favicon-512x512.png" type="image/png" />
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#FFFFFF" />
<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="/favicon-512x512.png" />`

  return (
    <div>
      <h3 className="py-20 text-center text-4xl">
        {t('How to Install Favicons on Your Website')}
      </h3>
      <p>
        {t(
          "Enhance your website's appearance across all devices by installing custom favicons. Follow these simple steps to integrate your newly generated favicon package:"
        )}
      </p>
      <ul>
        <li>
          <span>{t('Generate Your Favicon:')}</span>
          <span>
            {t(
              "Use our Favicon Generator to create custom icons with your desired text, colors, shape, and font. Click 'Generate Favicon' to download your favicon package."
            )}
          </span>
        </li>
        <li>
          <span>{t('Download and Unzip:')}</span>
          <span>
            {t(
              "Once generated, download the favicon package and extract the files to your website's root directory."
            )}
          </span>
        </li>
        <li>
          <span>{t('Add HTML Code:')}</span>
          <span>
            {t(
              'Insert the following code into the head section of your HTML file to ensure compatibility across various devices and browsers:'
            )}
          </span>
        </li>
      </ul>
      <div>
        <div>{t('Favicon HTML Code')}</div>
        <div>
          <div code={codeToCopy} language="html" />
        </div>
        <div>
          {t(
            'To test if the favicon is configured correctly, you can use https://favicon.im'
          )}
        </div>
        <Button value={codeToCopy}>
          {({ copied, copy }) => (
            <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
              {copied ? t('Copied') : t('Copy HTML Code')}
            </Button>
          )}
        </Button>
      </div>
    </div>
  )
}
