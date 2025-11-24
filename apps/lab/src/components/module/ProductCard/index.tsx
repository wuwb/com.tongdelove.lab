import Image from 'next/image'
import Link from 'next/link'

export const ProductCard = ({ product }) => {
  return (
    <div className="w-80 border shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <Image src={product.pictureUrl} alt="" width={320} height={240} />
        <div className="flex items-baseline justify-between p-2">
          <h2 className="text-lg font-bold">{product.title}</h2>
          <span>{product.price}</span>
        </div>
      </Link>
    </div>
  )
}
