import cartsRepository from "../repositories/carts.repository.js";

class CartsService {
  constructor() {
    this.repository = cartsRepository;
  }

  createOne = async (data) => await this.repository.create(data);
  readAll = async (filter) => await this.repository.find(filter);
  readByID = async (id) => await this.repository.findById(id);
  updateByID = async (id, data) => await this.repository.update(id, data);
  destroyByID = async (id) => await this.repository.delete(id);
}

const cartsService = new CartsService();
export default cartsService;