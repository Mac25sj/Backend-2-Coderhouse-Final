import cartsService from "../services/carts.service.js";

class CartsController {
  constructor() {
    this.service = cartsService;
  }

  createOne = async (req, res) => {
    const data = req.body;
    const one = await this.service.createOne(data);
    res.json201(one._id);
  };

  readAll = async (req, res) => {
    const filter = req.query;
    const all = await this.service.readAll(filter);
    all.length > 0
      ? res.json200(all)
      : res.json404("No se encuentran carritos");
  };

  readByID = async (req, res) => {
    const { id } = req.params;
    const one = await this.service.readByID(id);
    one
      ? res.json200(one)
      : res.json404("Carrito no encontrado");
  };

  updateByID = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const one = await this.service.updateByID(id, data);
    one
      ? res.json200(one)
      : res.json404("Carrito no encontrado para actualizar");
  };

  destroyByID = async (req, res) => {
    const { id } = req.params;
    const one = await this.service.destroyByID(id);
    one
      ? res.json200(one)
      : res.json404("Carrito no encontrado para eliminar");
  };
}

const cartsController = new CartsController();
export default cartsController;