import usersRepository from "../repositories/users.repository.js";
import { verifyToken } from "../helpers/token.util.js";

const setupPolicies = (policies) => async (req, res, next) => {
  try {
    const normalized = policies.map(p => p.toUpperCase?.()); // Normalize policies
    console.log("🧪 Políticas evaluadas:", normalized); // Debug log

    if (normalized.includes("PUBLIC")) return next(); // ✅ Salta autenticación

    const token = req?.cookies?.token || req?.signedCookies?.token;
    if (!token) return res.json401("Token no presente");

    const data = verifyToken(token);
    const { _id, role } = data || {};

    if (!_id) return res.json401("Token inválido o expirado");

    const authorized = normalized.includes(role?.toUpperCase?.());
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