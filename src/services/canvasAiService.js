import api from './api.js'

export const canvasAiService = {
  chat: (message, history) => api.post('/canvas-ai/chat', { message, history }).then(r => r.data),
}
