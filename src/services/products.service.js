import { productsManager } from "../data/manager.mongo.js";

class ProductsService {
  constructor() {
    this.manager = productsManager;
  }

  createOne = async (data) => await this.manager.createOne(data);
  readAll = async (filter) => await this.manager.readAll(filter);
  readByID = async (id) => await this.manager.readByID(id);
  updateByID = async (id, data) => await this.manager.updateByID(id, data);
  destroyByID = async (id) => await this.manager.destroyByID(id);
}

const productsService = new ProductsService();
export default productsService;
