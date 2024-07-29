import React, { FC } from 'react'
import { Card, CardContent } from '@mantine/core'
import Image from 'next/image'
import user1 from '@/public/images/backgrounds/u1.jpg'
import { Button, Text } from '@mantine/core'

const blogs = [
  {
    img: user1,
    title: 'Super awesome, Angular 12 is coming soon!',
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: 'error',
  },
]

type ButtonColor =
  | 'error'
  | 'warning'
  | 'primary'
  | 'inherit'
  | 'secondary'
  | 'success'
  | 'info'

export const BlogCard: FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {blogs.map((blog, index) => (
        <div key={index}>
          <Card
            sx={{
              p: 0,
              width: '100%',
            }}
          >
            <Image src={blog.img} alt="img" />
            <CardContent
              sx={{
                paddingLeft: '30px',
                paddingRight: '30px',
              }}
            >
              <Text
                sx={{
                  fontSize: 'h4.fontSize',
                  fontWeight: '500',
                }}
              >
                {blog.title}
              </Text>
              <Text
                color="textSecondary"
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  mt: 1,
                }}
              >
                {blog.subtitle}
              </Text>
              <Button
                variant="contained"
                sx={{
                  mt: '15px',
                }}
                color={blog.btncolor as ButtonColor}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
