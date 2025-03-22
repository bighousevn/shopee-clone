export default function SortProductList() {
  return (
    <div className=' bg-gray-300 py-4 px-3 flex flex-wrap justify-between items-center gap-2'>
      <div className='flex flex-wrap items-center justify-start gap-2'>
        <div className='text-sm'> Sắp xếp theo</div>
        <button className='h-10 px-5 hover:bg-orange/80 text-center bg-orange text-white outline-none border text-sm '>
          Phổ biến
        </button>
        <button className='h-10 px-4 hover:bg-slate-100/80 text-center bg-white text-black outline-none border text-sm '>
          Mới nhất
        </button>
        <button className='h-10 px-4 hover:bg-slate-100/80 text-center bg-white text-black outline-none border text-sm '>
          Bán chạy
        </button>
        <select className='w-48 h-10 hover:bg-slate-100/80  bg-white text-black' value=''>
          <option value='' disabled>
            Giá:
          </option>
          <option value='price:asc'>Giá: Thấp đến cao</option>
          <option value='price:desc'>Giá: Cao đến thấp</option>
        </select>
      </div>
      <div className='flex items-center '>
        <span className='text-orange'>1/</span>
        <span>2</span>
        <div className='ml-2'>
          <button className=' px-2 py-2 rounded-tl-sm rounded-bl-sm  cursor-not-allowed bg-white/60 hover:bg-slate-100 '>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='size-4'>
              <path
                fillRule='evenodd'
                d='M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <button className='px-2 py-2 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-100'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='size-4'>
              <path
                fillRule='evenodd'
                d='M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
