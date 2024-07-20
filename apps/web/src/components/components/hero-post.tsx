import DateFormater from '../components/date-formater'
import { CoverImage } from '../components/cover-image'
import Link from 'next/link'

export const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28 md:grid md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <DateFormater dateString={date} />
          </div>
        </div>
        <div>
          <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
          {/* <Avatar src={author.picture} size="large" /> */}
          <p>{author.name}</p>
        </div>
      </div>
    </section>
  )
}
