import RouterHelper from "../../helpers/Router.helper.js";
import cartsController from "../../controllers/carts..controller.js";

class CartsRouter extends RouterHelper {
  constructor() {
    super();
    this.controller = cartsController;
    this.init();
  }

  init() {
    this.create("/", ["USER", "ADMIN"], this.controller.createOne);
    this.read("/", ["USER", "ADMIN"], this.controller.readAll);
    this.read("/:id", ["USER", "ADMIN"], this.controller.readByID);
    this.update("/:id", ["USER", "ADMIN"], this.controller.updateByID);
    this.delete("/:id", ["USER", "ADMIN"], this.controller.destroyByID);
  }
}

const cartsRouter = new CartsRouter().getRouter();
export default cartsRouter;