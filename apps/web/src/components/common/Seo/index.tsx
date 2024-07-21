import React from 'react'
import { DefaultSeo } from 'next-seo'

export const Seo = (props) => {
  {
    /* Global site metadata */
  }
  return (
    <DefaultSeo
      titleTemplate={`%s`}
      title="Page"
      description=""
      openGraph={{
        // Title and description are mandatory
        title: '',
        description: '',
        images: Object.values([]).map((image) => {
          return {
            url: '',
            width: 0,
            height: 0,
          }
        }),
      }}
      twitter={{
        cardType: '',
        handle: '',
      }}
    />
  )
}
