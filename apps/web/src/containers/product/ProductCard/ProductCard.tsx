import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug?: string
    title?: string | null
    subTitle?: string
    price?: number
    image?: string
  }
  variant?: 'default' | 'compact'
  imgProps?: {
    width?: number
    height?: number
  }
}

export const ProductCard = ({
  product,
  variant = 'default',
  imgProps,
}: ProductCardProps) => {
  const productLink = product.slug
    ? `/products/${product.slug}`
    : `/product/${product.id}`

  const productImage = product.image || '/assets/products/accessories/1.jpg'
  const productTitle = product.title || product.name
  const productSubtitle = product.subTitle || ''

  const isRemoteImage =
    productImage.startsWith('http') || productImage.startsWith('https')

  if (variant === 'compact') {
    return (
      <Link href={productLink} passHref legacyBehavior>
        <a className="block">
          <div className="text-center">
            <div className="relative mx-auto mb-2 h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
              {isRemoteImage ? (
                <img
                  src={productImage}
                  alt={productTitle}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={productImage}
                  alt={productTitle}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <p className="truncate text-sm font-medium">{productTitle}</p>
            {product.price !== undefined && product.price !== null && (
              <p className="text-sm font-semibold text-blue-600">
                ¥{product.price.toFixed(2)}
              </p>
            )}
          </div>
        </a>
      </Link>
    )
  }

  return (
    <Link href={productLink} passHref legacyBehavior>
      <a className="group block no-underline">
        <div className="cursor-pointer transition-transform duration-200 hover:-translate-y-1">
          <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white pb-[100%] shadow-sm transition-shadow hover:shadow-md">
            {isRemoteImage ? (
              <img
                src={productImage}
                alt={productTitle}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <Image
                src={productImage}
                alt={productTitle}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
            )}
          </div>
          <div className="px-1 pt-3 pb-2">
            <h4 className="text-center text-base leading-tight font-medium text-gray-900">
              {productTitle}
            </h4>
            {productSubtitle && (
              <p className="mt-1 line-clamp-2 text-center text-sm leading-tight text-gray-500">
                {productSubtitle}
              </p>
            )}
            {product.price !== undefined && product.price !== null && (
              <p className="mt-2 text-center text-lg font-semibold text-blue-600">
                ¥{product.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </a>
    </Link>
  )
}
