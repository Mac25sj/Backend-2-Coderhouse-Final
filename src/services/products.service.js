import productsRepository from "../repositories/products.repository.js";

class ProductsService {
  constructor() {
    this.repository = productsRepository;
  }

  createOne = async (data) => await this.repository.create(data);
  readAll = async (filter) => await this.repository.find(filter);
  readByID = async (id) => await this.repository.findById(id);
  updateByID = async (id, data) => await this.repository.update(id, data);
  destroyByID = async (id) => await this.repository.delete(id);
}

const productsService = new ProductsService();
export default productsService;