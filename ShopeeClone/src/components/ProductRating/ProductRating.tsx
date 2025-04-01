export default function ProductRating({
  rating,
  activeClassname = 'size-4 fill-yellow-300',
  nonActiveClassname = 'size-4 fill-gray-300 '
}: {
  rating: number
  activeClassname?: string
  nonActiveClassname?: string
}) {
  const handleWidth = (index: number) => {
    if (rating > index) return '100%'
    if (rating < index && index - rating < 1) return (rating - Math.floor(rating)) * 100 + '%'
    return '0%'
  }

  return (
    <div className='flex'>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <div className='relative' key={index}>
              <div className='absolute top-0 left-0 h-full overflow-hidden ' style={{ width: handleWidth(index + 1) }}>
                <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={activeClassname}>
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>

              <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={nonActiveClassname}>
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
          )
        })}
    </div>
  )
}
