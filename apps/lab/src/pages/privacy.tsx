import { useTranslation } from '@/i18n'
import { NextSeo } from 'next-seo'

const Privacy = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        title={t(
          'Privacy Policy | Safeguarding Your Data and Rights - Printlake Lab'
        )}
        description={t(
          'We value your privacy. Our privacy policy outlines how we collect, use, and protect your personal information. Discover how we ensure the security of your data and the rights you have while using our collection of development tools.'
        )}
      />
      <div>
        {t(`Privacy Policy Effective Date: 2024/01/01 Introduction Welcome to
        Printlake. This Privacy Policy describes how we collect, use, and
        protect your personal information when you visit our website.
        Information We Collect We collect the following types of information:
        Personal Data: Name, email, and payment information. Non-Personal Data:
        Web cookies. Purpose of Data Collection We collect your data to process
        orders and improve our services. Data Sharing We do not share your
        personal data with any other parties. Children's Privacy We do not
        collect any data from children. Updates to the Privacy Policy If we
        update our Privacy Policy, we will notify you via email. Contact Us If
        you have any questions about this Privacy Policy, please contact us at
        support@tongdelove.com.`)}
      </div>
    </>
  )
}

export default Privacy
