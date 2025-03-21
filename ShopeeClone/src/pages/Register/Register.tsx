import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'

import Input from 'src/components/Input'
import { schema } from 'src/utils/rules'
import { registerAccount } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/type/util.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

interface FormData {
  email: string
  password: string
  confirm_password: string
}
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const navigate = useNavigate()
  const onsubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        console.log(data)
        setProfile(data.data.data.user)
        navigate('/', { replace: true })
      },
      onError: (err) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(err)) {
          const formError = err.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          //   setError('email', {
          //     message: formError?.email,
          //     type: 'server'
          //   })
          //   setError('password', {
          //     message: formError?.password,
          //     type: 'server'
          //   })
        }
      }
    })
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  //const rules = getRules(getValues)
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onsubmit}>
              <div className='text-2xl'>Đăng ký</div>

              <Input
                type='text'
                errorMessage={errors.email?.message}
                placeholder='Nhap email'
                name='email'
                className='mt-8'
                //rules={rules.email}
                register={register}
              />

              <Input
                type='password'
                errorMessage={errors.password?.message}
                placeholder='Password'
                name='password'
                className='mt-3'
                //rules={rules.password}
                register={register}
                autoComplete='on'
              />

              <Input
                type='password'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                name='confirm_password'
                className='mt-3'
                // rules={rules.confirm_password}
                register={register}
                autoComplete='on'
              />

              <div className='mt-3'>
                <Button
                  className='flex justify-center items-center w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  disabled={registerAccountMutation.isPending}
                  isLoading={registerAccountMutation.isPending}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
