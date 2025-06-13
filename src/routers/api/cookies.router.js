import { Router } from "express";

const cookiesRouter = Router();

const createCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Se ha creado una cookie de forma exitosa (201) 👍";
    const data = { method, url, message };

    res
      .status(201)
      .cookie("user_id", "ValorCookie1234", { maxAge: 7 * 24 * 60 * 60 * 1000 })
      .cookie("role", "admin", {
        maxAge: 12 * 24 * 60 * 60 * 1000,
        signed: true,
      })
      .json(data);
  } catch (error) {
    next(error);
    res.status(error.status || 500).json({ error: error.message });
  }
};

const readCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Cookie leída 👌👌";
    const cookies = { coookies: req.cookies, signed: req.signedCookies };
    const data = { method, url, message, cookies };

    res.status(200).json(data);
  } catch (error) {
    next(error);
    res.status(error.status || 500).json({ error: error.message });
  }
};

const clearCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "La cookie se ha limpiado correctamente";
    const data = { method, url, message };

    res
      .status(200)
      .clearCookie("role", { signed: true }) // Cookie firmada
      .clearCookie("user_id") // Cookie normal
      .json(data);
  } catch (error) {
    next(error);
    res.status(error.status || 500).json({ error: error.message });
  }
};

/* Rutas de cookies */
cookiesRouter.get("/create", createCb);
cookiesRouter.get("/read", readCb);
cookiesRouter.get("/clear", clearCb);

export default cookiesRouter;
