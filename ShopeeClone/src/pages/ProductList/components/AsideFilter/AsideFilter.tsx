import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'

export default function AsideFilter() {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center form-bold capitalize'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='mr-3 h-6 w-5 fill-current'
        >
          <path
            fillRule='evenodd'
            d='M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z'
            clipRule='evenodd'
          />
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4 ' />
      <ul>
        <li className='py-2 pl-2 flex items-center'>
          <Link className='relative  text-orange form-bold capitalize' to={path.home}>
            <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
              <polygon points='4 3.5 0 0 0 7' />
            </svg>
            Thoi trang nam
          </Link>
        </li>
        <li className='py-2 pl-2 flex items-center'>
          <Link className='relative  text-orange form-bold capitalize' to={path.home}>
            <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
              <polygon points='4 3.5 0 0 0 7' />
            </svg>
            Thoi trang nam
          </Link>
        </li>
      </ul>
      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4 ' />
      <div className='mt-5'>
        <div>Khoảng giá</div>
        <form className='mt-2 '>
          <div className='flex items-start'>
            <Input
              type='text'
              name='from'
              className='grow'
              placeholder='₫ TỪ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            ></Input>
            <div className='mx-2 my-2 shrink-0'>-</div>
            <Input
              type='text'
              name='from'
              className='grow'
              placeholder='₫ TỪ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            ></Input>
          </div>
          <Button className=' w-full py-2 text-white text-sm hover:bg-orange/80 bg-orange flex justify-center items-center'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4 ' />
      <div className=''> Đánh giá</div>
      <ul>
        <li className='py-1 px-1'>
          <Link to={path.home} className='flex items-center'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={index}>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                )
              })}
            tro len
          </Link>
        </li>
        <li className='py-1 px-1'>
          <Link to={path.home} className='flex items-center'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  <svg viewBox='0 0 30 30' className='mr-1 h-4 w-4' key={index}>
                    <defs>
                      <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                        <stop offset='0%' stopColor='#FFD211' />
                        <stop offset='100%' stopColor='#FFAD27' />
                      </linearGradient>
                    </defs>
                    <path
                      fill='none'
                      fillRule='evenodd'
                      stroke='url(#star__hollow)'
                      strokeWidth={2}
                      d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                    />
                  </svg>
                )
              })}
            tro len
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4 ' />
      <Button className='w-full py-2 uppercase bg-orange text-white border outline-none hover:bg-orange/80'>
        Xoa tat ca
      </Button>
    </div>
  )
}
