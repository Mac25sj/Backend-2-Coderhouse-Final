import authService from "../services/auth.service.js";
import { verifyToken } from "../helpers/token.util.js";

class AuthController {
  register = async (req, res) => {
    res.json201(null, "Registro exitoso, redirigiendo a login...");
  };

  login = async (req, res) => {
    const opts = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      signed: true,
    };

    const { user } = req;
    if (!user || !user.token) return res.json401("Credenciales inválidas");

    res.cookie("token", user.token, opts).json200({ message: "Login exitoso", user });
  };

  signout = (req, res) => {
    res.clearCookie("token").json200(null, "Sesión cerrada correctamente");
  };

  online = async (req, res) => {
    const { token } = req.signedCookies;
    if (!token) return res.json401("Token no proporcionado");

    const user = await authService.verifyUserByToken(token);
    if (!user) return res.json401("Usuario no válido");

    res.json200({ user });
  };

  badAuth = (req, res) => {
    res.json401("Error autenticando");
  };

  denegado = (req, res) => {
    res.json403("Acceso denegado, no tienes permisos");
  };
}

const authController = new AuthController();
export default authController;