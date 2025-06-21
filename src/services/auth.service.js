import dao from "../dao/factory.js";
import { verifyToken } from "../helpers/token.util.js";

class AuthService {
  constructor() {
    this.manager = dao.users;
  }

  async verifyUserByToken(token) {
    const decoded = verifyToken(token);
    if (!decoded) return null;

    const user = await this.manager.readById(decoded._id);
    if (!user) return null;

    // Si el DAO devuelve un documento Mongoose, usá .toObject(); 
    // si usás .lean() en los métodos del DAO, no es necesario
    const userObj = { ...user }; // asumiendo que ya es plano
    delete userObj.password;
    return userObj;
  }
}

const authService = new AuthService();
export default authService;