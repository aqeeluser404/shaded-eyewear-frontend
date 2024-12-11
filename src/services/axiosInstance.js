import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL

// ensures cookies & tokens are validated
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  config => {
    if (config.url.includes('/admin/sunglasses/create')) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
