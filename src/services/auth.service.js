import { usersManager } from "../data/manager.mongo.js";
import { verifyToken } from "../helpers/token.util.js";

class AuthService {
  constructor() {
    this.manager = usersManager;
  }

  async verifyUserByToken(token) {
    const decoded = verifyToken(token);
    if (!decoded) return null;

    const user = await this.manager.readById(decoded._id);
    if (!user) return null;

    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }
}

const authService = new AuthService();
export default authService;