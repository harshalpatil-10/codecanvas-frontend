import api from './api.js'

export const searchService = {
  search: (keyword) => api.get(`/search?keyword=${encodeURIComponent(keyword)}`).then(r => r.data),
}
