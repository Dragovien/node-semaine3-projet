import { api } from 'src/boot/axios'

class UserService {
  async login(user) {
    const response = await api.post('user/login', user)
    return response
  }

  async logout() {
    const response = await api.get('user/logout')
    return response
  }

  async getAll() {
    const response = await api.get('user/')
    return response
  }

  async createAccount(user) {
    const response = await api.post('user/createAccount', user )
    return response
  }

  async updateAccount(user) {
    const response = await api.post('user/updateAccount', user )
    return response
  }

  async deleteAccount(user) {
    const response = await api.post('user/deleteAccount', user )
    return response
  }

  async verifyToken() {
    const response = await api.post('user/verifyToken')
    return response
  }
}


export default new UserService()
