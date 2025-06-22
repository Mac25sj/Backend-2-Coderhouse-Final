import usersService from "../services/users.service.js";
import sendEmail from "../helpers/email.helper.js";

class UsersController {
  constructor() {
    this.service = usersService;
  }

  createOne = async (req, res) => {
    const data = req.body;
    const one = await this.service.createOne(data);
    res.json201(one._id);
  };

  readAll = async (req, res) => {
    const filter = req.query;
    const all = await this.service.readAll(filter);
    all.length > 0 ? res.json200(all) : res.json404("No se encontraron usuarios");
  };

  readByID = async (req, res) => {
    const { id } = req.params;
    const one = await this.service.readByID(id);
    one ? res.json200(one) : res.json404("Usuario no encontrado");
  };

  updateByID = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const one = await this.service.updateByID(id, data);
    one ? res.json200(one) : res.json404("Usuario no encontrado para actualizar");
  };

  destroyByID = async (req, res) => {
    const { id } = req.params;
    const one = await this.service.destroyByID(id);
    one ? res.json200(one) : res.json404("Usuario no encontrado");
  };

  sendEmail = async (req, res, next) => {
    try {
      const { method, originalUrl: url } = req;
      const { email } = req.params; 
      await sendEmail(email);
      res.status(200).json({ message: "Correo enviado", method, url });
    } catch (error) {
      next(error);
    }
  };
}

const usersController = new UsersController();
export default usersController;