import axiosClient from './axiosClient'

export const caseApi = {
  getCases: async () => {
    const { data } = await axiosClient.get('/api/cases/cases')
    return data.cases || []
  },
  getFictions: async () => {
    const { data } = await axiosClient.get('/api/cases/fictions')
    return data.fictions || []
  },
  createCase: async (payload) => {
    const { data } = await axiosClient.post('/api/cases/create-case', payload)
    return data
  },
  createFiction: async (payload) => {
    const { data } = await axiosClient.post('/api/cases/create-fiction', payload)
    return data
  },
  updateCase: async (id, payload) => {
    const { data } = await axiosClient.put(`/api/cases/cases/${id}`, payload)
    return data
  },
  deleteCase: async (id) => {
    const { data } = await axiosClient.delete(`/api/cases/cases/${id}`)
    return data
  },
  updateFiction: async (id, payload) => {
    const { data } = await axiosClient.put(`/api/cases/fictions/${id}`, payload)
    return data
  },
  deleteFiction: async (id) => {
    const { data } = await axiosClient.delete(`/api/cases/fictions/${id}`)
    return data
  },
  getById: async (id, kind = 'case') => {
    const list = kind === 'fiction' ? await caseApi.getFictions() : await caseApi.getCases()
    return list.find((item) => item._id === id) || null
  },
}
