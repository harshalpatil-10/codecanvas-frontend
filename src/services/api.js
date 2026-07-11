import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://codecanvas-backend-jtss.onrender.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('codecanvas_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.message || error.response?.data || error.message || 'Something went wrong.'
    return Promise.reject(new Error(typeof message === 'string' ? message : 'Something went wrong.'))
  }
)

export default api
