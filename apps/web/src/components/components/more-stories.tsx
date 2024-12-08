import { Card } from '@chakra-ui/react'
import { PostPreview } from '../components/post-preview'

export const MoreStories = ({ posts }) => {
  return (
    <>
      <h2>More Stories</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {posts.map((post) => (
          <Card.Root width="320px">
            <Card.Body gap="2" key={post.slug} style={{ width: 300 }}>
              <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            </Card.Body>
          </Card.Root>
        ))}
      </div>
    </>
  )
}
