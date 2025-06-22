import RouterHelper from "../helpers/Router.helper.js";
import productsRepository from "../repositories/products.repository.js";
import cartsRepository from "../repositories/carts.repository.js";

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
    this.render("/cart", ["USER", "ADMIN"], this.cartViewCb);
    this.render("/cart/confirmation", ["USER", "ADMIN"], this.confirmationViewCb);
  }

  homeViewCb = async (req, res) => {
    const products = await productsRepository.find();
    res.render("index", { products });
  };

  productViewCb = async (req, res) => {
    const { pid } = req.params;
    const product = await productsRepository.findById(pid);
    res.render("product", { product });
  };

  registerViewCb = async (_req, res) => {
    res.render("register");
  };

  loginViewCb = async (_req, res) => {
    res.render("login");
  };

  profileViewCb = async (req, res) => {
    res.render("profile", { user: req.user });
  };

  cartViewCb = async (req, res) => {
    const userId = req.user._id;
    const cartItems = await cartsRepository.find({
      user_id: userId,
      state: "reserved"
    });
    res.render("cart", { cartItems });
  };

  confirmationViewCb = (_req, res) => {
    res.render("confirmation");
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;