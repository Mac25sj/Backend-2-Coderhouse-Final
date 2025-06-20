import RouterHelper from "../helpers/Router.helper.js";
import { productsManager } from "../data/manager.mongo.js";

class ViewsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.render("/", ["PUBLIC"], this.homeViewCb);
    this.render("/products/:pid", ["PUBLIC"], this.productViewCb);
    this.render("/register", ["PUBLIC"], this.registerViewCb);
    this.render("/login", ["PUBLIC"], this.loginViewCb);
    this.render("/profile", ["USER", "ADMIN"], this.profileViewCb);
  }

  homeViewCb = async (req, res) => {
    const products = await productsManager.readAll();
    res.render("index", { products });
  };

  productViewCb = async (req, res) => {
    const { pid } = req.params;
    const product = await productsManager.readById(pid);
    res.render("product", { product });
  };

  registerViewCb = async (req, res) => {
    res.render("register");
  };

  loginViewCb = async (req, res) => {
    const products = await productsManager.readAll();
    res.render("login", { products });
  };

  profileViewCb = async (req, res) => {
    const products = await productsManager.readAll();
    res.render("profile", { products });
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;