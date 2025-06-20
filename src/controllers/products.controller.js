import productsService from "../services/products.service.js";

class ProductsController {
  constructor() {
    this.service = productsService;
  }
  createOne = async (req, res) => {
    const data = req.body;
    const one = this.service.createOne(data);
    res.json201(one._id);
  };

  readAll = async (req, res) => {
    const filter = req.query;
    const all = await this.service.readAll(filter);
    all.length > 0
      ? res.json200(all)
      : res.json404("No se encontraron productos");
  };

  readByID = async (req, res) => {
    const { id } = req.params;
    const one = await this.service.readByID(id);
    one ? res.json200(one) : res.json404("Producto no encontrado");
  };

  updateByID = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const one = await this.service.updateByID(id, data);
    one
      ? res.json200(one)
      : res.json404("Producto no encontrado para actualizar");
  };

  destroyByID = async (req, res) => {
    const { id } = req.params;
    const one = await this.service.destroyByID(id);
    one
      ? res.json200(one)
      : res.json404("Producto no encontrado para eliminar");
  };
}

const productsController = new ProductsController();
export default productsController;
