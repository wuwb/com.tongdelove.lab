import Link from 'next/link'
import Image from 'next/image'
import styled from '@emotion/styled'

const Product = styled.div`
  background: var(--color-background);
  padding-bottom: 99%;
  padding-bottom: calc(100% - 2px);
  border-radius: var(--radius-big);
  border: 1px solid var(--color-outline);
`

const ProductDetail = styled.div`
  .box-title {
    font-size: 1rem;
    line-height: 1.3;
    padding-top: 1em;
  }
`

export const ProductCard = ({ product, variant = 'default', imgProps }) => {
  return (
    <Link href="/product/id" passHref>
      {variant === 'default' && (
        <div className="product-wrap">
          <Product className="h-0 w-full overflow-hidden text-left">
            <Image
              width="800"
              height="800"
              src="/assets/products/accessories/1.jpg"
              alt=""
            />
          </Product>
          <ProductDetail>
            <h4 className="box-title text-center">珍珠棉卷</h4>
          </ProductDetail>
        </div>
      )}
    </Link>
  )
}
