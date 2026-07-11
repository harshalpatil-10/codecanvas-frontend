import api from './api.js'

export const noteService = {
  getAll: () => api.get('/notes').then(r => r.data),
  getById: (id) => api.get(`/notes/${id}`).then(r => r.data),
  create: (payload) => api.post('/notes', payload).then(r => r.data),
  update: (id, payload, version) => api.put(`/notes/${id}?version=${version}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/notes/${id}`).then(r => r.data),
  toggleFavorite: (id) => api.post(`/notes/${id}/favorite`).then(r => r.data),
}
