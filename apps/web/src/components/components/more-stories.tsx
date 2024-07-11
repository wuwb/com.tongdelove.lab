import { Card } from 'antd';
import PostPreview from '../components/post-preview';

export default function MoreStories({ posts }) {
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
          <Card key={post.slug} style={{ width: 300 }}>
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          </Card>
        ))}
      </div>
    </>
  );
}
