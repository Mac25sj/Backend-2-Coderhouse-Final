import { Router } from "express";
import { usersManager } from "../../data/manager.mongo.js";


const usersRouter = Router();

const createOne = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await usersManager.createOne(data);

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
    const all = await usersManager.readAll(filter);

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
    console.error("Error en readAll:", error); // Mejor manejo de errores
    next(error);
  }
};

const readByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await usersManager.readById(id);

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
    const data = req.body 
   const one = await usersManager.updateById(id, data);

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
    const one = await usersManager.destroyById(id);

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

usersRouter.post("/", createOne);
usersRouter.get("/", readAll);
usersRouter.get("/:id", readByID);
usersRouter.put("/:id", updateByID);
usersRouter.delete("/:id", destroyByID);

export default usersRouter;
