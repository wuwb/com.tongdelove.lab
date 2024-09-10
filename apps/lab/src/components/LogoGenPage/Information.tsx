import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkAutolinkHeadings from 'remark-autolink-headings'
import { useTranslation } from '@/i18n'

export const Information = () => {
  const { t } = useTranslation()

  const content = t(
    "### Favicon Sizes Generated\n\
\n\
Our favicon generator creates icons in these essential sizes: \n\
\n\
Common Apple Touch Icon Sizes: \n\
\n\
- **57x57px:** iPhone and iPod touch.\n\
- **60x60px:** Newer iPhone touch icons.\n\
- **72x72px:** iPad icons.\n\
- **76x76px:** iPad with retina display.\n\
- **114x114px:** iPhone with retina display.\n\
- **120x120px:** Newer iPhone touch retina icons.\n\
- **144x144px:** iPad with retina display.\n\
- **152x152px:** iPad with retina display.\n\
- **180x180px:** iPhone 6 + and newer retina icons.\n\
\n\
General Icon Sizes:\n\
\n\
- **16x16px:** Favicons for browser tabs.\n\
- **32x32px:** Standard size favicons.\n\
- **48x48px:** Windows shortcuts.\n\
- **64x64px:** Windows shortcuts.\n\
- **96x96px:** Chrome and Android devices.\n\
- **192x192px:** Android devices.\n\
- **512x512px:** Icons for high - resolution displays and certain Progressive Web Apps(PWAs).\n\
\n\
Additional Formats:\n\
\n\
- **favicon.ico(32x32px):** A multi - resolution icon file for maximum compatibility with older systems and browsers.\n\
- **SVG Format:** If enabled, the package also includes a scalable vector graphic(SVG) icon, which is ideal for various sizes and devices due to its scalability.\n\
\n\
### Why Multiple Favicon Sizes Matter\n\
\n\
In today's multi-device world, having multiple favicon sizes is crucial:\n\
\n\
- Ensures compatibility across all devices and browsers\n\
- Improves visual clarity on high-resolution displays\n\
- Meets requirements for Progressive Web Apps (PWAs)\n\
- Enhances recognition in crowded browser tabs"
  )

  return (
    <div className="prose mt-10 max-w-4xl text-base dark:prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkAutolinkHeadings]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
