import api from './api.js'

export const sqlService = {
  getAll: () => api.get('/sql').then(r => r.data),
  create: (payload) => api.post('/sql', payload).then(r => r.data),
  update: (id, payload) => api.put(`/sql/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/sql/${id}`).then(r => r.data),
  toggleFavorite: (id) => api.post(`/sql/${id}/favorite`).then(r => r.data),
}
