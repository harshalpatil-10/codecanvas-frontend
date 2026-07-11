import api from './api.js'

export const dashboardService = {
  getStats: () => api.get('/dashboard').then(r => r.data),
  getTimeline: () => api.get('/timeline').then(r => r.data),
}
