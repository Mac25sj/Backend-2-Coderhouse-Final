import dao from "../dao/factory.js";
import UsersDTO from "../dto/users.dto.js";

class UsersRepository {
  constructor() {
    this.manager = dao.users;
  }

  async create(data) {
    const dto = new UsersDTO(data);
    return await this.manager.createOne(dto);
  }

  async find(filter = {}) {
    return await this.manager.readAll(filter);
  }

  async findById(id) {
    return await this.manager.readById(id);
  }

  async findOne(filter) {
    return await this.manager.readBy(filter);
  }

  async update(id, data) {
    return await this.manager.updateById(id, data);
  }

  async delete(id) {
    return await this.manager.destroyById(id);
  }
}

const usersRepository = new UsersRepository();
export default usersRepository;