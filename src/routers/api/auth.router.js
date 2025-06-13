import { Router } from "express";
import { usersManager } from "../../data/manager.mongo.js";
import passport from "../../middlewares/passport.mid.js";
import { verifyToken } from "../../helpers/token.util.js";

const authRouter = Router();

const registerCb = async (req, res, next) => {
  try {
    const {method, originalUrl: url} = req;
    const message = "Registrado";
    const data = {method, url, message};
    res.status(201).json(data)
  }catch(errror){
    next(errror)
  }

   /* const existingUser = await usersManager.readBy({ email });
    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    const hashedPassword = await hash(password); 

    const user = await usersManager.createOne({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword
    });

    return res.status(201).json({ message: "Usuario registrado correctamente", user });
  } catch (error) {
    next(error);
  }*/
};


const loginCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Datos inválidos" });
    }

    let user = await usersManager.readBy({ email });
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isValidPassword = await compareHash(password, user.password); 
    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = verifyToken({ user_id: user._id, role: user.role, email: user.email });

    const opts = { maxAge: 12 * 24 * 60 * 60 * 1000, signed: true };
    const data = { method, url, message: "Inicio exitoso (200) 👍" };

    res.status(200).cookie("token", token, opts).json(data);
  } catch (error) {
    next(error);
  }
};

const signoutCb =  (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = { method, url, message: "Desconectado exitosamente (200) 👍" };
    console.log("Usuario desconectado")

    res.status(200).clearCookie("token").json(data);
  } catch (error) {
    next(error);
  }
};

const onlineCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { token } = req.signedCookies;
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    let user = await usersManager.readById(decodedToken.user_id);
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Eliminamos la contraseña antes de enviar los datos del usuario
    const { password, ...userData } = user.toObject();

    const data = {
      method,
      url,
      user: userData,
    };

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const badAuthCb = (req, res, next) => {
  try {
    return res.status(401).json({ error: "Error autenticando" });
    error.statusCode = 401
    throw error
    console.log("Error al autentificar");
    
  } catch (error) {
    next(error);
  }
};

const optionsBadAuth = { session: false, failureRedirect: "/api/auth/bad-auth" };

authRouter.post("/register", passport.authenticate("register", optionsBadAuth), registerCb);
authRouter.post("/login", passport.authenticate("login", optionsBadAuth), loginCb);
authRouter.post("/signout", signoutCb);
authRouter.post("/online", onlineCb);
authRouter.get("/bad-auth", badAuthCb);
authRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
authRouter.get("/google/redirect", passport.authenticate("google", optionsBadAuth), loginCb);

export default authRouter;




/*const registerCb = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    if (!email || !password || !first_name) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }*/