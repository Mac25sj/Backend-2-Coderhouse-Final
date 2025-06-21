import dao from "../dao/factory.js";
import ProductDTO from "../dto/products.dto.js";

class ProductsRepository {
  constructor() {
    this.manager = dao.products;
  }

  async create(data) {
    const dto = new ProductDTO(data);
    return await this.manager.createOne(dto);
  }

  async find(filter = {}) {
    return await this.manager.readAll(filter);
  }

  async findOne(filter) {
    return await this.manager.readBy(filter);
  }

  async findById(id) {
    return await this.manager.readById(id);
  }

  async update(id, data) {
    return await this.manager.updateById(id, data);
  }

  async delete(id) {
    return await this.manager.destroyById(id);
  }
}

const productsRepository = new ProductsRepository();
export default productsRepository;