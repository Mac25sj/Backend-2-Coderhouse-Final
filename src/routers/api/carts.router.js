import { Router } from "express";
import { cartsManager } from "../../data/manager.mongo.js";
//import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";


const cartsRouter = Router();

const createOne = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await cartsManager.createOne(data);
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
    const all = await cartsManager.readAll(filter);

    if (all.length > 0) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: all,
      });
    } else {
      const error = new Error("No se encuentran carritos");
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
    const one = await cartsManager.readById(id);

    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("⚠️⚠️Carrito no encontrado (no existe)");
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
    const one = await cartsManager.updateById(id, data);

    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("⚠️⚠️Carrito no encontrado (no existe)");
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
    const one = await cartsManager.destroyById(id);

    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("⚠️⚠️Carrito no encontrado (no existe)");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

//const optsDenegado = { session: false, failureRedirect: "/api/auth/denegado" };


cartsRouter.post("/",passportCb("current"), createOne);
cartsRouter.get("/",passportCb("current"), readAll);
cartsRouter.get("/:id",passportCb("current"), readByID);
cartsRouter.put("/:id",passportCb("current"), updateByID);
cartsRouter.delete("/:id",passportCb("current"), destroyByID);

export default cartsRouter;