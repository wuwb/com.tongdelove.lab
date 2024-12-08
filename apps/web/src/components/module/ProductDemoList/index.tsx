import { ProductDemoItem } from '@/components/module/ProductDemoList/ProductDemoItem'

interface ProductDemoListProps {
  products: {
    image: string
    title: string
  }[]
  title: string
}

export const ProductDemoList = ({ title, products }: ProductDemoListProps) => {
  return (
    <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
      <div className="font-heading px-2 py-4 text-2xl">{title}</div>
      <div className="flex flex-wrap justify-center gap-2">
        <ProductDemoItem data={products[0]} />
        <ProductDemoItem data={products[1]} />
        <ProductDemoItem data={products[2]} />
        <ProductDemoItem data={products[3]} />
        <ProductDemoItem data={products[4]} />
        <ProductDemoItem data={products[5]} />
      </div>
    </div>
  )
}
