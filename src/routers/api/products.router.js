import { Router } from "express";
import { productsManager } from "../../data/manager.mongo.js";

const productsRouter = Router();

const createOne = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await productsManager.createOne(data);
    res.status(201).json({
      method: req.method,
      url: req.originalUrl,
      response: one,
    });
  } catch (error) {
    console.error("Error en createOne:", error);
    next(error);
  }
};

const readAll = async (req, res, next) => {
  try {
    const filter = req.query;
    const all = await productsManager.readAll(filter);

    if (all.length > 0) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: all,
      });
    } else {
      const error = new Error("No se encuentra");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.error("Error en readAll:", error);
    next(error);
  }
};

const readByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await productsManager.readById(id);

    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error(" ⚠️⚠️Producto no encontrado (no exíste)");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const updateByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const one = await productsManager.updateById(id);

    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error(" ⚠️⚠️Producto no encontrado (no exíste)");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const destroyByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await productsManager.destroyById(id);

    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error(" ⚠️⚠️Producto no encontrado (no exíste)");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

productsRouter.post("/", createOne);
productsRouter.get("/", readAll);
productsRouter.get("/:id", readByID);
productsRouter.put("/:id", updateByID);
productsRouter.delete("/:id", destroyByID);

export default productsRouter;
