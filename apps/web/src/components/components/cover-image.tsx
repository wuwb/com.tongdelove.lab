import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'

export const CoverImage = ({ title, src, slug }) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={clsx('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    />
  )
  return (
    <div className="-mx-5 sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
