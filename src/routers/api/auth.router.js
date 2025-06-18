import { Router } from "express";
import { usersManager } from "../../data/manager.mongo.js";
//import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { verifyToken } from "../../helpers/token.util.js";

const authRouter = Router();

// Callback para registro
const registerCb = async (req, res, next) => {
  try {
    console.log("✅ Usuario registrado correctamente");
    res
      .status(201)
      .json({ message: "Registro exitoso, redirigiendo a login..." });
  } catch (error) {
    console.error("⚠️ Error en registerCb:", error);
    next(error);
  }
};

// Callback para login
const loginCb = async (req, res, next) => {
  try {
    console.log("Iniciando login...");

    const opts = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      signed: true,
    };
    const { user } = req;

    if (!user || !user.token) {
      console.error("❌ Error: Usuario no autenticado o token no generado");
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    console.log("✅ Usuario autenticado:", user);

    res
      .status(200)
      .cookie("token", user.token, opts)
      .json({ message: "Login exitoso", user });

    console.log("✅ Login exitoso, cookies establecidas.");
  } catch (error) {
    console.error("⚠️ Error en loginCb:", error);
    next(error);
  }
};

// Callback para cerrar sesión
const signoutCb = (req, res, next) => {
  try {
    console.log("🔄 Usuario desconectado");

    res
      .status(200)
      .clearCookie("token")
      .json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("⚠️ Error en signoutCb:", error);
    next(error);
  }
};

// Callback para verificar usuario online
const onlineCb = async (req, res, next) => {
  try {
    console.log("🔍 Verificando usuario online...");

    const { token } = req.cookies;
    if (!token) {
      console.error("❌ No se encontró un token válido");
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      console.error("❌ Token inválido o expirado");
      return res.status(401).json({ error: "Token inválido" });
    }

    let user = await usersManager.readById(decodedToken._id);
    if (!user) {
      console.error("❌ Usuario no encontrado");
      return res.status(401).json({ error: "Usuario no válido" });
    }

    console.log("✅ Usuario encontrado en la sesión:", user);

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({ user: userData });
  } catch (error) {
    console.error("⚠️ Error en onlineCb:", error);
    next(error);
  }
};

// Callback para errores de autenticación
const badAuthCb = (req, res) => {
  console.error("❌ Error al autenticar");
  return res.status(401).json({ error: "Error autenticando" });
};

const denegadoCb = (req, res, next) => {
  try {
    const error = new Error("Acceso denegado, no tienes permisos");
    error.statusCode = 403;
    throw error;
  } catch (error) {
    next(error);
  }
};

// Opciones para autenticación
/*const optionsBadAuth = {
  session: false,
  failureRedirect: "/api/auth/bad-auth",
};

const optsDenegado = { session: false, failureRedirect: "/api/auth/denegado" };*/

// Definición de rutas de autenticación
authRouter.post("/register", passportCb("register"), registerCb);
authRouter.post("/login", passportCb("login"), loginCb);
authRouter.post("/signout", passportCb("current"), signoutCb);
authRouter.post("/online", passportCb("current"), onlineCb);
authRouter.get("/bad-auth", badAuthCb); 
authRouter.get("/denegado", denegadoCb); 
authRouter.get( "/google",passportCb("google", { scope: ["email", "profile"] }));
authRouter.get("/google/redirect", passportCb("google"), loginCb);

export default authRouter;
