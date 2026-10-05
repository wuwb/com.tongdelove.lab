import { Product } from './Product'

export const Category = ({ data }) => {
  return (
    <div className="duration-500 animate-in fade-in fill-mode-forwards">
      {data.products.map((product, index) => (
        <Product key={product.name} product={product} id={`view-${index}`} />
      ))}
    </div>
  )
}
