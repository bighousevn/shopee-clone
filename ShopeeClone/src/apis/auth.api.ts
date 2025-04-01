import { AuthResponse } from 'src/type/auth.type'
import http from 'src/utils/http'

const URL_REGISTER = 'register'
const URL_LOGIN = 'login'
const URL_LOGOUT = 'logout'
const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  logoutAccount() {
    return http.post<AuthResponse>(URL_LOGOUT)
  }
}
export default authApi
