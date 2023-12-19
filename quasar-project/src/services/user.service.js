import { api } from 'src/boot/axios'

class UserService {
  async login(user) {
    const response = await api.post('user/login', user)
    return response
  }

  async createAccount(user) {
    const response = await api.post('user/createAccount', user )
    return response
  }

  async verifyToken() {
    const response = await api.post('user/verifyToken')
    return response
  }
}


export default new UserService()
