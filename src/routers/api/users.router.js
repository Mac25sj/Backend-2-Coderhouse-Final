import RouterHelper from "../../helpers/Router.helper.js";
import usersController from "../../controllers/users.controller.js";
import passportCb from "../../middlewares/passportCb.mid.js"


class UsersRouter extends RouterHelper {
  constructor() {
    super();
    this.controller = usersController;
    this.init();
  }

  init() {
    this.create("/", ["ADMIN"], this.controller.createOne);
    this.read("/", ["ADMIN"], this.controller.readAll);
    this.read("/:id", ["ADMIN"], this.controller.readByID);
    this.update("/:id", ["USER"], this.controller.updateByID);
    this.delete("/:id", ["USER"], this.controller.destroyByID);
  }
}

const usersRouter = new UsersRouter().getRouter();
export default usersRouter;
//const optsDenegado = { session: false, failureRedirect: "/api/auth/denegado" };
