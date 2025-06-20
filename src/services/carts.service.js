import { cartsManager } from "../data/manager.mongo.js";

class CartsService {
  constructor() {
    this.manager = cartsManager;
  }

  createOne = async (data) => await this.manager.createOne(data);
  readAll = async (filter) => await this.manager.readAll(filter);
  readByID = async (id) => await this.manager.readById(id);
  updateByID = async (id, data) => await this.manager.updateById(id, data);
  destroyByID = async (id) => await this.manager.destroyById(id);
}

const cartsService = new CartsService();
export default cartsService;