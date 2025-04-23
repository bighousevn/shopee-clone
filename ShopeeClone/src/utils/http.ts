import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCode } from 'src/constants/HttpStatusCode.enum'
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  saveAccessTokenToLS,
  saveProfileToLS,
  saveRefreshTokenToLS
} from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'
import { RefreshTokenResponse } from 'src/types/auth.type'
import config from 'src/constants/config'

class Http {
  instance: AxiosInstance
  private accessToken: string
  public refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS() || ''
    this.refreshToken = getRefreshTokenFromLS() || ''
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 5, // 10 giây
        'expire-refresh-token': 60 * 60 // 1 giờ
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        // console.log(url)
        console.log(response)
        if (url === 'login' || url === 'register') {
          this.accessToken = response.data.data.access_token
          this.refreshToken = response.data.data.refresh_token
          saveAccessTokenToLS(this.accessToken)
          saveRefreshTokenToLS(this.refreshToken)
          const user = response.data.data.user

          saveProfileToLS(user)
        } else if (url === 'logout') {
          this.accessToken = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        if (
          ![HttpStatusCode.Unauthorized, HttpStatusCode.UnprocessableEntity].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          console.log(message)
          toast.error(message)
        }
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || { url: '', headers: {} }
          const { url } = config

          if (isAxiosExpiredTokenError(error) && url !== 'refresh-access-token') {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({
                ...config,
                headers: {
                  ...config.headers,
                  authorization: access_token
                }
              })
            })
          }

          clearLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
          // window.location.reload()
        }

        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>('refresh-access-token', {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        saveAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance
export default http
