const inferStatus = (item) => {
  const content = `${item?.title || ''} ${item?.body || ''}`.toLowerCase()
  if (/(solved|closed|resolved)/.test(content)) return 'solved'
  if (/(unsolved|cold|unresolved)/.test(content)) return 'unsolved'
  return 'under investigation'
}

export const normalizeItem = (item, type = 'case') => ({
  id: item._id,
  title: item.title,
  body: item.body,
  location: item.location || 'Unknown location',
  caseType: item.caseType || (type === 'fiction' ? 'Fiction Archive' : 'Paranormal Case'),
  status: item.status || inferStatus(item),
  createdAt: item.createdAt || item.updatedAt || null,
  updatedAt: item.updatedAt || null,
})

export const shortText = (text = '', length = 130) => {
  if (text.length <= length) return text
  return `${text.slice(0, length)}...`
}

export const formatDate = (iso) => {
  if (!iso) return 'Date unavailable'
  const parsed = new Date(iso)
  if (Number.isNaN(parsed.getTime())) return 'Date unavailable'
  return parsed.toLocaleDateString()
}

export const toErrorMessage = (error) => {
  return error?.response?.data?.message || 'Something went wrong. Try again.'
}
