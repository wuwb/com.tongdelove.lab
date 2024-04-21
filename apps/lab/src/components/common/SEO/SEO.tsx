import { NextSeo } from 'next-seo'

type ISEOProp = {
  title: string
  description: string
  canonical: string
  ogLocale: string
  ogSiteName: string
  ogShareImage?: {
    formats: string
  }
  twitterCardType?: string
  twitterUsername?: string
}

export const SEO = (props: ISEOProp) => {
  // Prevent errors if no props was set
  if (!props) {
    return null
  }

  // <meta name="robots" content="follow, index" />
  // <meta name="description" content={meta.description} />
  // <meta property="og:site_name" content={meta.title} />
  // <meta property="og:description" content={meta.description} />
  // <meta property="og:title" content={meta.title} />
  // <meta property="og:image" content={meta.image} />
  // <meta name="twitter:card" content="summary_large_image" />
  // <meta name="twitter:site" content="@yourname" />
  // <meta name="twitter:title" content={meta.title} />
  // <meta name="twitter:description" content={meta.description} />
  // <meta name="twitter:image" content={meta.image} />

  return (
    <NextSeo
      title={props.title}
      description={props.description}
      canonical={props.canonical}
      openGraph={{
        // Title and description are mandatory
        title: props.title,
        description: props.description,
        url: props.canonical,
        locale: props.ogLocale,
        site_name: props.ogSiteName,
        type: 'website',
        // Only include OG image if we have it
        // Careful: if you disable image optimization in Strapi, this will break
        ...(props.ogShareImage && {
          images: Object.values(props.ogShareImage.formats).map((image: any) => {
            return {
              url: image.urls,
              width: image.width,
              height: image.height,
            }
          }),
        }),
      }}
      // Only included Twitter data if we have it
      twitter={{
        ...(props.twitterCardType && { cardType: props.twitterCardType }),
        // Handle is the twitter username of the content creator
        ...(props.twitterUsername && { handle: props.twitterUsername }),
        site: props.ogSiteName,
      }}
    />
  )
}
