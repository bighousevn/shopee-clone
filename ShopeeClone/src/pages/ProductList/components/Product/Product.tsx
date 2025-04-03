import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formateNumberToSocialStyle, generateNameId } from 'src/utils/utils'
interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='bg-white rounded-sm hover:translate-y-[0.04rem] hover:shadow-md'>
        <div className='w-full  pt-[100%] relative'>
          <img src={product.image} alt={product.name} className='absolute top-0 left-0 w-full h-full object-cover' />
        </div>
        <div className='p-2 overflow-hidden '>
          <div className=' min-h-[2rem] text-sm line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex'>
            <div className='max-w-[50%] text-gray-500 line-through truncate'>
              <span>{formatCurrency(product.price_before_discount)}</span>
              <span>₫</span>
            </div>
            <div className='ml-2 text-orange truncate'>
              <span>{formatCurrency(product.price)}</span>
              <span>₫</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-start'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm truncate'>
              <span>Đã bán</span>
              <span className='ml-1 '>{formateNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
