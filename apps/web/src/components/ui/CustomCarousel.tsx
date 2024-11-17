import { Box } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css' // Import Swiper styles

import Image, { StaticImageData } from 'next/image'

interface CustomCarouselProps {
  images: {
    url: string | StaticImageData
  }[]
}

export const CustomCarousel = ({ images }: CustomCarouselProps) => {
  return (
    <Swiper spaceBetween={30} pagination={{ clickable: true }} navigation loop>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Box>
            <Image src={image.url} alt="" />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
