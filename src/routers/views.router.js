import { Router } from "express";
import { productsManager } from "../data/manager.mongo.js";

const viewsRouter = Router();

const homeViewCb = async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productsManager.readAll();
    console.log(products);
    res.status(200).render("index", { products });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const productViewCb = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.readById(pid);
    console.log("Leidos");
    res.status(200).render("product", { product });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const registerViewCb = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.readById(pid);
    console.log("Leidos");
    res.status(200).render("register", { product });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const loginViewCb = async (req, res) => {
  try {
    const products = await productsManager.readAll();
    res.status(200).render("login", { products });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const profileViewCb = async (req, res) => {
  try {
    const products = await productsManager.readAll();
    res.status(200).render("profile", { products });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};
viewsRouter.get("/", homeViewCb);
viewsRouter.get("/products/:pid", productViewCb);
viewsRouter.get("/register", registerViewCb);
viewsRouter.get("/login", loginViewCb);
viewsRouter.get("/profile", profileViewCb);

export default viewsRouter;
