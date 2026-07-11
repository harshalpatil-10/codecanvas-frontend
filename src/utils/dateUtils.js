export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatRelative(dateStr) {
  if (!dateStr) return '—'
  const now = new Date()
  const d = new Date(dateStr)
  const diffMs = now - d
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return formatDate(dateStr)
}

export function daysAgo(dateStr) {
  if (!dateStr) return 0
  const diffMs = new Date() - new Date(dateStr)
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}
