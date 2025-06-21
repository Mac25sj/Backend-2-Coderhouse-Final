import User from "./models/users.model.js";
import Product from "./models/products.model.js";
import Cart from "./models/carts.model.js";
import dbConnect from "../../helpers/dbConnect.helper.js";

await dbConnect(process.env.URL_MONGO); // Conexión previa a instancias

class DaoMongo {
  constructor(model) {
    if (!model) throw new Error("El modelo es requerido.");
    this.model = model;
  }

  createOne = async (data) => {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.error("Error al crear:", error);
      throw error;
    }
  };

  readAll = async (filter = {}) => {
    try {
      return await this.model.find(filter).lean();
    } catch (error) {
      console.error("Error al leer todos:", error);
      throw error;
    }
  };

  readBy = async (data) => {
    try {
      return await this.model.findOne(data).lean();
    } catch (error) {
      console.error("Error al leer por filtro:", error);
      throw error;
    }
  };

  readById = async (id) => {
    try {
      return await this.model.findById(id).lean();
    } catch (error) {
      console.error("Error al leer por ID:", error);
      throw error;
    }
  };

  updateById = async (id, data) => {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error("Error al actualizar:", error);
      throw error;
    }
  };

  destroyById = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error al eliminar:", error);
      throw error;
    }
  };
}

const usersManager = new DaoMongo(User);
const productsManager = new DaoMongo(Product);
const cartsManager = new DaoMongo(Cart);

export { usersManager, productsManager, cartsManager };