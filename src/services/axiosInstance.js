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
    // Add Client-ID header for requests to Imgur
    if (config.url.includes('https://api.imgur.com/3/image')) {
      config.headers['Authorization'] = 'Client-ID 507f4f0628c426f'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
