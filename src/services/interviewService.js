import api from './api.js'

export const interviewService = {
  start: (payload) => api.post('/interview/start', payload).then(r => r.data),
  submitAnswer: (sessionId, payload) => api.post(`/interview/${sessionId}/answer`, payload).then(r => r.data),
  getReport: (sessionId) => api.get(`/interview/${sessionId}/report`).then(r => r.data),
  getHistory: () => api.get('/interview/history').then(r => r.data),
}
