import usersRepository from "../repositories/users.repository.js";

class UsersService {
  constructor() {
    this.repository = usersRepository;
  }

  createOne = async (data) => await this.repository.create(data);
  readAll = async (filter) => await this.repository.find(filter);
  readByID = async (id) => await this.repository.findById(id);
  updateByID = async (id, data) => await this.repository.update(id, data);
  destroyByID = async (id) => await this.repository.delete(id);
}

const usersService = new UsersService();
export default usersService;