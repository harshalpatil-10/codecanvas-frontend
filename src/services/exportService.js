import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://codecanvas-backend-jtss.onrender.com/api'

export const exportService = {
  downloadNotePdf: async (noteId, title) => {
    const token = localStorage.getItem('codecanvas_token')
    const res = await axios.get(`${API_BASE_URL}/export/note/${noteId}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const a = document.createElement('a')
    a.href = url
    a.download = `${title || 'note'}.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  },
}
