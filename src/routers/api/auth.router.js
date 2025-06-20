import RouterHelper from "../../helpers/Router.helper.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import authController from "../../controllers/auth.controller.js";

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.controller = authController;
    this.init();
  }

  init() {
    this.create("/register", ["PUBLIC"], passportCb("register"), this.controller.register);
    this.create("/login", ["PUBLIC"], passportCb("login"), this.controller.login);
    this.create("/signout", ["USER", "ADMIN"], this.controller.signout);
    this.create("/online", ["USER", "ADMIN"], this.controller.online);
    this.read("/bad-auth", ["PUBLIC"], this.controller.badAuth);
    this.read("/denegado", ["PUBLIC"], this.controller.denegado);
    this.read("/google", ["PUBLIC"], passportCb("google", { scope: ["email", "profile"] }));
    this.read("/google/redirect", ["PUBLIC"], passportCb("google"), this.controller.login);
  }
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;