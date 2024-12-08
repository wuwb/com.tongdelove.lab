import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

interface ProductDemoItemProps {
  data?: {
    image: string
    title: string
  }
}

export const ProductDemoItem = ({ data }: ProductDemoItemProps) => {
  if (!data) {
    return null
  }
  return (
    <div className="">
      <div className="product">
        <Link href="" className="action-hover">
          <Image width={240} height={240} src={data.image} alt={data.title} />
        </Link>
      </div>
      <div className="product-detail">
        <h4 className="box-title">
          <Link
            href="/products/corrugated-mailer-boxes"
            className="action-hover text-center text-base"
          >
            {data.title}
          </Link>
        </h4>
      </div>
    </div>
  )
}
