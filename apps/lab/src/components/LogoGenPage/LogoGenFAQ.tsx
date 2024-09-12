import { Faq } from '@/components/Faq/Faq'
import { useTranslation } from '@/i18n'

export const LogoGenFAQ = () => {
  const { t } = useTranslation()

  const faqData = [
    {
      question: t('什么是图标生成器'),
      answer: t(
        '图标生成器是一款免费的在线工具，提供文本转徽标和文本转图标生成服务。只需输入所需的文本，即可快速创建具有专业外观的徽标和图标。该工具提供广泛的自定义选项，支持多种格式，并提供即时预览，让任何人都可以轻松创建高质量的品牌资产，而无需设计经验或昂贵的软件。'
      ),
    },
    {
      question: t('什么是 favicon ?'),
      answer: t(
        '图标是与网站关联的小图标，通常显示在浏览器的地址栏、选项卡和书签中。'
      ),
    },
    {
      question: t('字体版权如何？'),
      answer: t(
        `检查每种字体的许可信息以确定其使用权非常重要。不同的字体有不同的许可条款：

某些字体可免费用于个人和商业用途。
其他字体可能可免费用于个人用途，但需要许可才能用于商业应用。
某些字体可能对修改或嵌入有限制。
示例：Impact 字体因表情包和大胆设计而广受欢迎，个人使用可免费使用。但是，商业使用通常需要购买许可证。

请务必验证所用字体的许可条款，尤其是商业项目。如有疑问，请考虑使用开源替代方案或购买适当的许可证以确保符合法律要求。
`
      ),
    },
    {
      question: t('什么是 favicon'),
      answer: t(
        '图标是与网站关联的小图标，通常显示在浏览器的地址栏、选项卡和书签中。'
      ),
    },
    {
      question: t('网站图标文本支持哪些类型的字符？'),
      answer: t(
        `我们的网站图标生成器支持多种字符，包括：

标准字母数字字符（A-Z、a-z、0-9）
特殊符号和标点符号（!@#$%^&* 等）
来自各种脚本的 Unicode 字符（例如中文、日语、阿拉伯语、西里尔文）
表情符号（😊、🚀、🌈 等）
您可以使用单个字符、多个字符，甚至可以组合不同类型的字符。但请注意，复杂或冗长的文本可能会被缩小以适合图标，这可能会影响小显示屏上的可读性。`
      ),
    },
    {
      question: t('为什么我需要不同的图标尺寸？'),
      answer: t(
        '不同的设备和平台使用不同的图标尺寸。提供多种尺寸可确保您的图标在所有设备上看起来都清晰。'
      ),
    },
    {
      question: t('如何将图标添加到我的网站？'),
      answer: t(
        '复制我们的生成器提供的 HTML 代码并将其粘贴到 HTML 文档的 <head> 部分。确保将图标文件上传到您的网络服务器。'
      ),
    },

    {
      question: t('Is this favicon generator free?'),
      answer: t(
        'Yes, our favicon generator is completely free to use with no restrictions.'
      ),
    },
    {
      question: t('Can I use these favicons for commercial projects?'),
      answer: t(
        'Google Fonts can be used for commercial purposes, including printing on products like clothing for sale. Most of the fonts available in the Google Fonts library are released under the Open Font License (OFL), which allows you to freely use, modify, and distribute the fonts, even for commercial projects.\n\
        However, there are a few important considerations:\n\
\n\
- Font - Specific Restrictions: While most fonts are free to use, you should carefully read the license that accompanies each font to ensure there are no specific restrictions.\n\
- Trademarks and Copyrights: Although the font files themselves can be used freely, the font names may be trademarked.Therefore, you should not use the font names as a brand or trademark for your products.\n\
- Modifying Fonts: If you plan to modify the fonts, make sure to adhere to the terms outlined in the Open Font License.\n\
- Responsibility: Ensure that you comply with all relevant laws and licensing terms when using the fonts.\n\
\n\
In summary, using Google Fonts for commercial purposes is generally permitted, but it is advisable to review the specific license terms of each font before applying them to commercial projects.'
      ),
      markdown: true,
    },
    {
      question: t(
        'How does the favicon generator ensure quality across sizes?'
      ),
      answer: t(
        'We use advanced SVG rendering to maintain clarity and sharpness in all generated favicon sizes.'
      ),
    },
    {
      question: t('Does the favicon generator support SVG output?'),
      answer: t(
        'Yes, our generator supports SVG output, but with limitations. SVG output is only available for English letters and basic Latin characters. Asian languages and special characters require specific fonts and are not supported in SVG mode. For full language support, please use the standard PNG output.'
      ),
    },
    {
      question: t('Does your favicon generator support the .ico format?'),
      answer: t(
        'Yes, our generator supports the .ico format, which is a 32x32 pixel icon file commonly used for maximum compatibility, especially with older systems and browsers. This ensures your favicon looks great across all platforms, including legacy systems.'
      ),
    },
    {
      question: t('Why do you provide a 32x32 .ico file?'),
      answer: t(
        'We provide a 32x32 .ico file because it offers the best balance between size and quality for older systems. This size is widely supported and ensures your favicon is visible even on legacy browsers and operating systems that may not fully support newer favicon formats.'
      ),
    },
    {
      question: t(
        'Why should I use the .ico format in addition to PNG and SVG?'
      ),
      answer: t(
        "While modern browsers support PNG and SVG favicons, some older browsers and systems still prefer the .ico format. By including an .ico file in your favicon set, you ensure the widest possible compatibility for your website's icon across different platforms and browser versions."
      ),
    },
  ]

  return <Faq data={faqData} />
}
