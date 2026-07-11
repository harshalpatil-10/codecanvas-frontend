import api from './api.js'

export const snippetService = {
  getAll: () => api.get('/snippets').then(r => r.data),
  create: (payload) => api.post('/snippets', payload).then(r => r.data),
  update: (id, payload) => api.put(`/snippets/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/snippets/${id}`).then(r => r.data),
  toggleFavorite: (id) => api.post(`/snippets/${id}/favorite`).then(r => r.data),
}
