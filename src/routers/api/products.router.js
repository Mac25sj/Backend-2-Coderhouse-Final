import RouterHelper from "../../helpers/Router.helper.js";
import productsController from "../../controllers/products.controller.js";

class ProductsRouter extends RouterHelper {
constructor() {
  super();
  this.controller = productsController; // primero defino el controller
  this.init(); // ahora sí puede usarlo
}


  init() {
    this.create("/", ["ADMIN"], this.controller.createOne);
    this.read("/", ["PUBLIC"], this.controller.readAll);
    this.read("/:id", ["PUBLIC"], this.controller.readByID);
    this.update("/:id", ["ADMIN"], this.controller.updateByID);
    this.delete("/:id", ["ADMIN"], this.controller.destroyByID);
  }
}

const productsRouter = new ProductsRouter().getRouter();
export default productsRouter;
