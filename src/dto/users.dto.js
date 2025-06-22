import crypto from "crypto";
import { createHash } from "../helpers/hash.util.js";

const { PERSISTENCE } = process.env;

class UserDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }

    this.first_name = data.first_name?.trim();
    this.last_name = data.last_name?.trim();
    this.email = data.email?.toLowerCase().trim();
    this.age = data.age || null;
    this.role = data.role || "user";

    if (data.password) {
      const isHash = /^\$2[aby]?\$/.test(data.password); // Detecta bcrypt hash
      this.password = isHash ? data.password : createHash(data.password);
    }

    if (data.cart) {
      this.cart = data.cart;
    }

    if (data.token) {
      this.token = data.token;
    }
  }
}

export default UserDTO;