import RouterHelper from "../../helpers/Router.helper.js";
import cartsController from "../../controllers/carts..controller.js";


class CartsRouter extends RouterHelper {
  constructor() {
    super();
    this.controller = cartsController;
    console.log("Métodos del controller:", Object.keys(this.controller)); // 👈 adentro del constructor
    this.init();
  }

  init() {
    this.create("/", ["USER", "ADMIN"], this.controller.createOne);
    this.create("/add/:pid", ["USER", "ADMIN"], this.controller.addToCart);
    this.read("/", ["USER", "ADMIN"], this.controller.readAll);
    this.read("/:id", ["USER", "ADMIN"], this.controller.readByID);
    this.update("/:id", ["USER", "ADMIN"], this.controller.updateByID);
    this.delete("/:id", ["USER", "ADMIN"], this.controller.destroyByID);
    this.read("/mine", ["USER", "ADMIN"], this.controller.getUserCart);
    this.create("/checkout", ["USER", "ADMIN"], this.controller.checkout);
    this.read("/confirmation", ["USER", "ADMIN"], this.controller.confirmationView);
  }
}

const cartsRouter = new CartsRouter().getRouter();
export default cartsRouter;