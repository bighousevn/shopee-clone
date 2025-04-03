import classNames from 'classnames'
import { sortBy, order as orderConstant } from 'src/constants/product'
import { ProductListConfig } from 'src/types/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: ProductListConfig['sort_by']) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handleOrder = (orderByValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, sort_by: sortBy.price, order: orderByValue }).toString()
    })
  }
  return (
    <div className=' bg-gray-300 py-4 px-3 flex flex-wrap justify-between items-center gap-2'>
      <div className='flex flex-wrap items-center justify-start gap-2'>
        <div className='text-sm'> Sắp xếp theo</div>
        <button
          className={classNames('h-8 px-4 text-center text-sm capitalize ', {
            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
          })}
          onClick={() => {
            handleSort(sortBy.view)
          }}
        >
          Phổ biến
        </button>
        <button
          className={classNames('h-8 px-4 text-center text-sm capitalize ', {
            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
          })}
          onClick={() => {
            handleSort(sortBy.createdAt)
          }}
        >
          Mới nhất
        </button>
        <button
          className={classNames('h-8 px-4 text-center text-sm capitalize ', {
            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
          })}
          onClick={() => {
            handleSort(sortBy.sold)
          }}
        >
          Bán chạy
        </button>

        <select
          className={classNames('h-8  px-4 text-left text-sm capitalize  outline-none ', {
            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
          })}
          value={order || ''}
          onChange={(event) => {
            handleOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)
          }}
        >
          <option value='' disabled className='bg-white text-black'>
            Giá:
          </option>
          <option className='bg-white text-black' value={orderConstant.asc}>
            Giá: Thấp đến cao
          </option>
          <option className='bg-white text-black' value={orderConstant.desc}>
            Giá: Cao đến thấp
          </option>
        </select>
      </div>
      <div className='flex items-center '>
        <span className='text-orange'>{page}/</span>
        <span>{pageSize}</span>
        <div className='ml-2 flex'>
          {page === 1 ? (
            <span className='flex items-center justify-center size-8 cursor-not-allowed  rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='size-4'>
                <path
                  fillRule='evenodd'
                  d='M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
              }}
              className='flex items-center justify-center size-8  rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='size-4'>
                <path
                  fillRule='evenodd'
                  d='M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          )}
          {page === pageSize ? (
            <span className='flex items-center justify-center size-8 cursor-not-allowed  rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='size-4'>
                <path
                  fillRule='evenodd'
                  d='M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
              }}
              className='flex items-center justify-center size-8  rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='size-4'>
                <path
                  fillRule='evenodd'
                  d='M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
