import { caseApi } from './caseApi'

export const reportApi = {
  submitReport: async ({ title, body, type }) => {
    if (type === 'fiction') {
      return caseApi.createFiction({ title, body })
    }
    return caseApi.createCase({ title, body })
  },
}
