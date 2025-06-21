import usersRepository from "../repositories/users.repository.js";
import { verifyToken } from "../helpers/token.util.js";

const setupPolicies = (policies) => async (req, res, next) => {
  try {
    if (policies.includes("PUBLIC")) return next();

    const token = req?.signedCookies?.token;
    const data = verifyToken(token);
    const { _id, role } = data || {};

    if (!_id) return res.json401("Token inválido o no autenticado");

    const authorized = policies.includes(role);
    if (!authorized) return res.json403("No tienes permisos");

    const user = await usersRepository.findById(_id);
    if (!user) return res.json401("Usuario no encontrado");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default setupPolicies;