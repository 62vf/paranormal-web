import axiosClient from './axiosClient'

export const authApi = {
  register: async (payload) => {
    const { data } = await axiosClient.post('/api/auth/register', payload)
    return data
  },
  login: async (payload) => {
    const { data } = await axiosClient.post('/api/auth/login', payload)
    return data
  },
  logout: async () => {
    const { data } = await axiosClient.post('/api/auth/logout')
    return data
  },
}
