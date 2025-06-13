import { Router } from "express";
import session from "express-session";

const sessionsRouter = Router();

const createCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Se ha creado una sección de forma exitosa (201) 👍";
    const data = { method, url, message };
    req.session.role = "ADMIN";
    req.session.user_id = "prueba123";
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const readCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Se ha leeído una cookie de forma exitosa (200) 👍";
    const session = req.session;
    const data = { method, url, message, session };
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const destroyCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Se ha suprimido una sección de forma exitosa (200) 👍";
    const data = { method, url, message };
    req.session.destroy();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

sessionsRouter.use("/create", createCb);
sessionsRouter.use("/read", readCb);
sessionsRouter.use("/destroy", destroyCb);

export default sessionsRouter;
