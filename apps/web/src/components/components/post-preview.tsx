import Image from 'next/image';
import { Card, Avatar } from 'antd';
import DateFormater from '../components/date-formater';
import CoverImage from './cover-image';
import Link from 'next/link';

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <div className="mb-5">
        <Card style={{width: '500px'}} title="运行此命令以下载库。">
            {/* <CoverImage slug={slug} title={title} src={coverImage} /> */}
          <Image
            width={435} height={200}
            src="https://zeit.co/docs/static/docs/git-integrations/github-comment.png"
            alt=""
          />
        </Card>
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        {/* <DateFormater dateString={date} /> */}
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {/* <Avatar name={author.name} picture={author.picture} /> */}
    </div>
  );
};
