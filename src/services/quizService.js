import api from './api.js'

export const quizService = {
  generate: (noteId) => api.get(`/quiz/${noteId}`).then(r => r.data),
}
