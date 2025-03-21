import { InputHTMLAttributes } from 'react'
import type { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  //rules?: RegisterOptions
}

export default function Input({
  type,
  errorMessage,
  placeholder,
  name,
  className,
  //rules,
  register,
  autoComplete,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1rem] text-sm'
}: Props) {
  const registerResult = register && name ? register(name) : {}
  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        // {...register(name, rules)}
        {...registerResult}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
