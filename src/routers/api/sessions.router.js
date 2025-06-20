import RouterHelper from "../../helpers/Router.helper.js";
import sessionsController from "../../controllers/session.controller.js";

class SessionsRouter extends RouterHelper {
  constructor() {
    super();
    this.controller = sessionsController;
    this.init();
  }

  init() {
    this.read("/create", this.controller.create);
    this.read("/read", this.controller.read);
    this.read("/destroy", this.controller.destroy);
  }
}

const sessionsRouter = new SessionsRouter().getRouter();
export default sessionsRouter;