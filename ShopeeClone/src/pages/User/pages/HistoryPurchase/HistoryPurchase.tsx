import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' }
]

export default function HistoryPurchase() {
  const queryParam = useQueryParams()
  // const { onSubmitSearch, register } = useSearchProducts()
  const status = Number(queryParam.status) || purchasesStatus.all
  const { data } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })
  const purchasesData = data?.data.data
  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))

  return (
    <div className=''>
      <div>
        <div className='overflow-x-auto'>
          <div className='min-w-[700px]'>
            <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>

            {purchasesData && purchasesData.length > 0 ? (
              <div>
                {/* <form className='col-span-9' onSubmit={onSubmitSearch}>
                  <div className='flex items-center mt-4 bg-gray-200  rounded-sm p-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                      />
                    </svg>
                    <input
                      type='text'
                      className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
                      placeholder=''
                      {...register('name')}
                    />
                  </div>
                </form> */}
                {purchasesData.map((purchase) => {
                  return (
                    <div key={purchase._id} className=''>
                      <Link
                        to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                        className='flex justify-between mt-4 rounded-sm border border-black/10 bg-white p-6 shadow-sm'
                      >
                        <div className='flex'>
                          <img
                            className='flex-shrink-0 h-[100px] w-[100px] object-cover border border-black/10'
                            alt={purchase.product._id}
                            src={purchase.product.image}
                          />
                          <div className='ml-3 -black text-xl'>
                            <div>{purchase.product.name}</div>
                            <div>x{purchase.buy_count}</div>
                          </div>
                        </div>

                        <div className='flex'>
                          <div className='flex justify-center items-center text-black/20 line-through text-[1rem] mx-2'>
                            ₫{formatCurrency(purchase.price_before_discount)}
                          </div>
                          <div className='flex justify-center items-center text-orange text-[1rem]'>
                            ₫{formatCurrency(purchase.price)}
                          </div>
                        </div>
                      </Link>

                      <div className='flex justify-end rounded-sm border border-t-0 border-black/10 bg-white p-6 shadow-sm '>
                        <div className='text-xl'>Thành tiền: </div>
                        <div className='ml-4 text-orange text-2xl'>
                          ₫{formatCurrency(purchase.buy_count * purchase.price)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className='flex flex-col justify-center items-center bg-white h-[600px] w-full'>
                <img
                  src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/4751043c866ed52f9661.png'
                  alt=''
                  className='size-28'
                />
                <span>Chưa có đơn hàng </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
