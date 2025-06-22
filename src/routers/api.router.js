import { Router } from "express";
import usersRouter from "./api/users.router.js";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
import cookiesRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import authRouter from "./api/auth.router.js";

import productsRepository from "../repositories/products.repository.js";

const apiRouter = Router();

apiRouter.get("/products/list", async (req, res) => {
  try {
    const products = await productsRepository.find();
    res.json({ products }); 
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Prefijos existentes
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/auth", authRouter);
export default apiRouter;