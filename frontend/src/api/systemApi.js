import axiosClient from './axiosClient'

export const systemApi = {
  health: async () => {
    const { data } = await axiosClient.get('/api/health')
    return data
  },
}
