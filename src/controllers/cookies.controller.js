import cookiesService from "../services/cookies.service.js";

class CookiesController {
  create = (req, res) => {
    const { method, originalUrl: url } = req;
    const message = "Se ha creado una cookie de forma exitosa (201) 👍";
    const data = { method, url, message };

    cookiesService.create(res).status(201).json(data);
  };

  read = (req, res) => {
    const { method, originalUrl: url } = req;
    const message = "Cookie leída 👌👌";
    const cookies = cookiesService.read(req);
    const data = { method, url, message, cookies };

    res.status(200).json(data);
  };

  clear = (req, res) => {
    const { method, originalUrl: url } = req;
    const message = "La cookie se ha limpiado correctamente";
    const data = { method, url, message };

    cookiesService.clear(res).status(200).json(data);
  };
}

const cookiesController = new CookiesController();
export default cookiesController;