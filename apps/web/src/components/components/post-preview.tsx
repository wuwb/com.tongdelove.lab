import Image from 'next/image'
import { Card } from '@chakra-ui/react'
import { Avatar } from '@/components/ui/avatar'
import { DateFormater } from '../components/date-formater'
import { CoverImage } from './cover-image'
import Link from 'next/link'

export const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) => {
  return (
    <div>
      <div className="mb-5">
        <Card.Root style={{ width: '500px' }} title="运行此命令以下载库。">
          {/* <CoverImage slug={slug} title={title} src={coverImage} /> */}
          <Image
            width={435}
            height={200}
            src="https://zeit.co/docs/static/docs/git-integrations/github-comment.png"
            alt=""
          />
        </Card.Root>
      </div>
      <h3 className="mb-3 text-3xl leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="mb-4 text-lg">
        {/* <DateFormater dateString={date} /> */}
      </div>
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
      {/* <Avatar name={author.name} picture={author.picture} /> */}
    </div>
  )
}
