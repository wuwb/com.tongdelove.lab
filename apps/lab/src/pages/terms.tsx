import { useTranslation } from '@/i18n'
import { NextSeo } from 'next-seo'

const Terms = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        title={t('Terms of Service | Your Agreement with Us - Printlake Lab')}
        description={t(
          'Welcome to our Terms of Service page. Here, you will find the rules and regulations governing your use of our independent development tools collection. By accessing our site, you agree to these terms, which outline your rights and responsibilities as a user. Please read carefully to understand how we operate and how we can support your development journey.'
        )}
      />
      <div>
        Terms of Service Effective Date: August 13, 2024 Introduction Welcome to
        Printlake. By accessing and using our website, you agree to comply with
        and be bound by the following terms and conditions. Use of the Site You
        agree to use Printlake for lawful purposes only. You must not use our
        site in any way that may cause damage to the site or impair the
        availability or accessibility of the site. User Data Collection We
        collect personal data including your name, email, and payment
        information, as well as non-personal data such as web cookies. For more
        information, please refer to our Privacy Policy. Intellectual Property
        All content on Printlake, including text, graphics, logos, and images,
        is the property of Printlake or its content suppliers and is protected
        by applicable intellectual property laws. Limitation of Liability
        Printlake will not be liable for any damages arising from the use of or
        inability to use our website. Governing Law These terms are governed by
        the laws of the USA. Any disputes arising from these terms or your use
        of the site will be resolved in the courts of the USA. Updates to the
        Terms We may update these Terms of Service from time to time. If we make
        changes, we will notify you via email. Contact Us If you have any
        questions about these Terms of Service, please contact us at
        support@tongdelove.com
      </div>
    </>
  )
}
export default Terms
