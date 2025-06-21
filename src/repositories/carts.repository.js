import dao from "../dao/factory.js";
import CartDTO from "../dto/carts.dto.js";

class CartsRepository {
  constructor() {
    this.manager = dao.carts;
  }

  async create(data) {
    const dto = new CartDTO(data);
    return await this.manager.createOne(dto);
  }

  async find(filter = {}) {
    return await this.manager.readAll(filter);
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

  async findOne(filter) {
    return await this.manager.readBy(filter);
  }
}

const cartsRepository = new CartsRepository();
export default cartsRepository;