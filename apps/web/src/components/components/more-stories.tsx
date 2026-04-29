import { Card, CardContent } from '@tongdelove/ui/components/card'
import { PostPreview } from './post-preview'

export const MoreStories = ({ posts }) => {
  return (
    <>
      <h2>More Stories</h2>
      <div className="flex justify-between gap-4">
        {posts.map((post) => (
          <Card key={post.slug} className="w-[320px]">
            <CardContent className="gap-2">
              <PostPreview
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
