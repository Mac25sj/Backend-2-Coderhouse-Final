import productsService from "../services/products.service.js";

class ProductsController {
  constructor() {
    this.service = productsService;
  }

  createOne = async (req, res) => {
    try {
      const data = req.body;
      const one = await this.service.createOne(data);
      res.json201(one._id);
    } catch (err) {
      res.json500("Error al crear producto");
    }
  };

  readAll = async (req, res) => {
    try {
      const filter = req.query;
      const all = await this.service.readAll(filter);
      all.length > 0
        ? res.json200(all)
        : res.json404("No se encontraron productos");
    } catch (err) {
      res.json500("Error al obtener productos");
    }
  };

  readByID = async (req, res) => {
    try {
      const { id } = req.params;
      const one = await this.service.readByID(id);
      one ? res.json200(one) : res.json404("Producto no encontrado");
    } catch (err) {
      res.json500("Error al obtener producto");
    }
  };

  updateByID = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const one = await this.service.updateByID(id, data);
      one
        ? res.json200(one)
        : res.json404("Producto no encontrado para actualizar");
    } catch (err) {
      res.json500("Error al actualizar producto");
    }
  };

  destroyByID = async (req, res) => {
    try {
      const { id } = req.params;
      const one = await this.service.destroyByID(id);
      one
        ? res.json200(one)
        : res.json404("Producto no encontrado para eliminar");
    } catch (err) {
      res.json500("Error al eliminar producto");
    }
  };

  getProductView = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await this.service.readByID(pid);
      if (!product) {
        return res.status(404).render("error", {
          error: { message: "Producto no encontrado" }
        });
      }
      res.render("product", { product });
    } catch (err) {
      console.error("❌ Error al renderizar producto:", err);
      res.status(500).render("error", {
        error: { message: "Error interno al cargar el producto" }
      });
    }
  };
}

const productsController = new ProductsController();
export default productsController;