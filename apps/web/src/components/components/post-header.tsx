// import Avatar from '../components/avatar';
import DateFormater from '../components/date-formater';
import CoverImage from '../components/cover-image';
import { Card } from 'antd';
import Categories from './categories';

export default function PostHeader({ title, coverImage, date, author, categories }) {
  return (
    <>
      <div>{title}</div>
      <div className="hidden md:block md:mb-12">
        {/* author.picture */}
        {/* <User src="https://zeit.co/api/www/avatar/?u=evilrabbit&s=160" name={author.name} /> */}
      </div>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <Card>
          {/* <CoverImage title={title} src={coverImage} slug=""/> */}
        </Card>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
            {/* <User src="https://zeit.co/api/www/avatar/?u=evilrabbit&s=160" name={author.name} /> */}
        </div>
        <div className="mb-6 text-lg">
            Posted <DateFormater dateString={date} />
          {/* <Categories categories={categories} /> */}
        </div>
      </div>
    </>
  );
}
