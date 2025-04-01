/*
Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page

[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20

1 2 ... 4 5 [6] 8 9 ... 19 20

1 2 ...13 14 [15] 16 17 ... 19 20


1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
 */
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  let dotAfter = false
  let dotBefore = false

  const renderDotBefore = (index: number) => {
    if (!dotBefore) {
      dotBefore = true
      return (
        <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'>
          ...
        </span>
      )
    }
    return null
  }
  const renderDotAfter = (index: number) => {
    if (!dotAfter) {
      dotAfter = true
      return (
        <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'>
          ...
        </span>
      )
    }
    return null
  }
  const renderPagination = () => {
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const currentPage = index + 1
        if (currentPage > page + RANGE && page <= RANGE * 2 + 1 && currentPage < pageSize - RANGE + 1)
          return renderDotBefore(currentPage)
        else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (currentPage > RANGE && currentPage < page - RANGE) return renderDotAfter(currentPage)
          else if (currentPage > page + RANGE && currentPage < pageSize - RANGE + 1) return renderDotBefore(currentPage)
        } else if (page >= pageSize - RANGE * 2)
          if (currentPage > RANGE && currentPage < page - RANGE) return renderDotAfter(currentPage)

        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({ ...queryConfig, page: currentPage.toString() }).toString()
            }}
            key={currentPage}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-cyan-500': currentPage === page,
              'border-transparent': currentPage !== page
            })}
          >
            {currentPage}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page == 1 ? (
        <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border'>Prev</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Prev
        </Link>
      )}

      {renderPagination()}
      {page == pageSize ? (
        <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border'>Next</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Next
        </Link>
      )}
    </div>
  )
}
