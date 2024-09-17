import { Container, Footer } from '@/components/common'
import { useState } from 'react'
import { NextSeo } from 'next-seo'
import { useTranslation } from '@/i18n'

const Page = (props) => {
  const mockWorks = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description:
        'A fully functional online store with user authentication and payment integration.',
      image: '/images/placeholders/covers/1.jpg',
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description:
        'A responsive portfolio website showcasing various projects and skills.',
      image: '/images/placeholders/covers/2.jpg',
    },
    {
      id: 3,
      title: 'Task Management App',
      description:
        'A web application for managing tasks and projects with team collaboration features.',
      image: '/images/placeholders/covers/3.jpg',
    },
    {
      id: 4,
      title: 'Weather Forecast App',
      description:
        'A weather application providing real-time forecasts and historical data visualization.',
      image: '/images/placeholders/covers/4.jpg',
    },
  ]

  const WorksList = () => {
    const [works] = useState(mockWorks)
    const { t } = useTranslation()

    return (
      <>
        <NextSeo
          title={t('Web Development Portfolio - Showcasing Our Best Works')}
          description={t(
            'Explore our collection of web development projects, showcasing our expertise in creating responsive, user-friendly, and innovative websites and applications.'
          )}
        />
        <h1 className="mb-6 text-3xl font-bold">{t('Our Works')}</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <div
              key={work.id}
              className="overflow-hidden rounded-lg border shadow-lg"
            >
              <img
                src={work.image}
                alt={work.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="mb-2 text-xl font-semibold">{work.title}</h2>
                <p className="text-gray-600">{work.description}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }
  return (
    <Container>
      <div className="my-10">
        <WorksList />
      </div>
      <Footer />
    </Container>
  )
}

export default Page
