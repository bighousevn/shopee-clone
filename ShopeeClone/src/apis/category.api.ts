import { Category } from 'src/type/category.type'
import { SuccessResponse } from 'src/type/util.type'
import http from 'src/utils/http'

const URL = 'categories'
const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}
export default categoryApi
