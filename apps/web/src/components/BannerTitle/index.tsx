import React from 'react'

interface BannerTitleProps {
  children: React.ReactNode
  desc?: string
}

export const BannerTitle = (props: BannerTitleProps) => {
  return (
    <div>
      <h3 className="banner-title text-center text-lg">{props.children}</h3>
      {props.desc ? (
        <div className="banner-title-desc text-md">{props.desc}</div>
      ) : null}
    </div>
  )
}
