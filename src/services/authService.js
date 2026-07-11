import api from './api.js'

export const authService = {
  register: (payload) => api.post('/auth/register', payload).then(r => r.data),
  login: (payload) => api.post('/auth/login', payload).then(r => r.data),
  updateProfile: (payload) => api.put('/auth/profile', payload).then(r => r.data),
  changePassword: (payload) => api.put('/auth/change-password', payload).then(r => r.data),
}
