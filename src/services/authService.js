import api from './api.js'

export const authService = {
  register: (payload) => api.post('/auth/register', payload).then(r => r.data),
  login: (payload) => api.post('/auth/login', payload).then(r => r.data),
  verifyOtp: (payload) => api.post('/auth/verify-otp', payload).then(r => r.data),
  resendOtp: (payload) => api.post('/auth/resend-otp', payload).then(r => r.data),
  updateProfile: (payload) => api.put('/auth/profile', payload).then(r => r.data),
  changePassword: (payload) => api.put('/auth/change-password', payload).then(r => r.data),
}
