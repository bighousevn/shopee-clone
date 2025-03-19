import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder: string
  className?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  //rules?: RegisterOptions
  autoComplete?: string
}

export default function Input({
  type,
  errorMessage,
  placeholder,
  name,
  className,
  //rules,
  register,
  autoComplete
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        // {...register(name, rules)}
        {...register(name)}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
