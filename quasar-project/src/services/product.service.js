import { api } from 'src/boot/axios'

class ProductService {

  async getAll() {
    const response = await api.get('product/')
    return response
  }

  async create(product) {
    const response = await api.post('product/create', product)
    return response
  }


  async delete(product) {
    const response = await api.post('product/delete', product)
    return response
  }
}


export default new ProductService()
