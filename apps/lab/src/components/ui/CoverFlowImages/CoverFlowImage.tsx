import 'swiper/css/bundle'
import Image from 'next/legacy/image'
import cn from 'clsx'
import { useEffect } from 'react'
import { useRef } from 'react'
import React from 'react'
import Swiper, { EffectCoverflow, Lazy } from 'swiper'
import styles from './CoverFlowImages.module.scss'
import { Lightbox } from '../Lightbox'

Swiper.use([Lazy, EffectCoverflow])

export const CoverFlowImages = (props: { images: string[] }) => {
  const containerRef = useRef<HTMLDivElement>()
  const setLightbox = useRef<(open: boolean, index: number) => void>()

  const openLightBox = (index: number) => {
    setLightbox.current?.(true, index)
  }

  useEffect(() => {
    new Swiper(containerRef.current, {
      effect: 'coverflow',
      grabCursor: true,
      // slidesPerView: 1.3,
      slidesPerView: 'auto',
      spaceBetween: 30,
      lazy: true,
      height: 400,
      coverflowEffect: props.images.length > 1 && {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
    })

    for (const image of props.images) {
      if (image.endsWith('.mp4')) {
        const video = document.getElementById(image) as HTMLVideoElement
        video.addEventListener(
          'mouseover',
          function () {
            this.controls = true
          },
          false
        )
        video.addEventListener(
          'mouseout',
          function () {
            this.controls = false
          },
          false
        )
      } else {
        //
      }
    }

    const onScroll = () => {
      for (const image of props.images) {
        if (image.endsWith('.mp4')) {
          const video = document.getElementById(image) as HTMLVideoElement
          if (video && isElementInViewport(video)) {
            video.play()
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [props.images])

  return (
    <div className={cn('swiper', styles.swiper, props.images.length < 2 ? styles.content : styles.screenshots)} ref={containerRef} tabIndex={1}>
      <div className="swiper-wrapper">
        {props.images.map((image, index) => {
          let content

          if (image.endsWith('.mp4')) {
            content = <video muted id={image} src={image} data-src={image} className={cn('swiper-lazy', styles.video)} />
          } else {
            content = <Image onClick={() => openLightBox(index)} id={image} alt={image} src={image} data-src={image} className={cn('swiper-lazy', styles.image)} />
          }

          return (
            <div key={image} style={{ width: props.images.length < 2 ? '100%' : undefined }} className={cn('swiper-slide', styles.slide)}>
              {content}
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </div>
          )
        })}
      </div>
      <Lightbox
        images={props.images ?? []}
        getState={setOpen => {
          setLightbox.current = setOpen
        }}
      />
    </div>
  )
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0
    // && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  )
}
