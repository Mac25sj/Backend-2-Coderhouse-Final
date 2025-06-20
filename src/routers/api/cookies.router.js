import RouterHelper from "../../helpers/Router.helper.js";
import cookiesController from "../../controllers/cookies.controller.js";

class CookiesRouter extends RouterHelper {
  constructor() {
    super();
    this.controller = cookiesController;
    this.init();
  }

  init() {
    this.read("/create", this.controller.create);
    this.read("/read", this.controller.read);
    this.read("/clear", this.controller.clear);
  }
}

const cookiesRouter = new CookiesRouter().getRouter();
export default cookiesRouter;