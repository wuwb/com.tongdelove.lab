// import Avatar from '../components/avatar';
import { DateFormater } from '../components/date-formater'
import { CoverImage } from '../components/cover-image'
import { Categories } from './categories'

export const PostHeader = ({ title, coverImage, date, author, categories }) => {
  return (
    <>
      <div>{title}</div>
      <div className="hidden md:mb-12 md:block">
        {/* author.picture */}
        {/* <User src="https://zeit.co/api/www/avatar/?u=evilrabbit&s=160" name={author.name} /> */}
      </div>
      <div className="-mx-5 mb-8 sm:mx-0 md:mb-16">
        {/* <CoverImage title={title} src={coverImage} slug=""/> */}
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {/* <User src="https://zeit.co/api/www/avatar/?u=evilrabbit&s=160" name={author.name} /> */}
        </div>
        <div className="mb-6 text-lg">
          Posted <DateFormater dateString={date} />
          {/* <Categories categories={categories} /> */}
        </div>
      </div>
    </>
  )
}
