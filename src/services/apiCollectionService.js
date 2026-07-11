import api from './api.js'

export const apiCollectionService = {
  getAll: () => api.get('/collection').then(r => r.data),
  create: (payload) => api.post('/collection', payload).then(r => r.data),
  update: (id, payload) => api.put(`/collection/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/collection/${id}`).then(r => r.data),
  toggleFavorite: (id) => api.post(`/collection/${id}/favorite`).then(r => r.data),
}
