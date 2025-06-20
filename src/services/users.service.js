import { usersManager } from "../data/manager.mongo.js";

class UsersService {
  constructor() {
    this.manager = usersManager;
  }

  createOne = async (data) => await this.manager.createOne(data);
  readAll = async (filter) => await this.manager.readAll(filter);
  readByID = async (id) => await this.manager.readById(id);
  updateByID = async (id, data) => await this.manager.updateById(id, data);
  destroyByID = async (id) => await this.manager.destroyById(id);
}

const usersService = new UsersService();
export default usersService;