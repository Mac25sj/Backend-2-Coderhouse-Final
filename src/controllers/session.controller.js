import sessionsService from "../services/sessions.service.js";

class SessionsController {
  create = (req, res) => {
    const { method, originalUrl: url } = req;
    const data = sessionsService.createSession(req.session, {
      role: "ADMIN",
      user_id: "prueba123",
    });

    res.status(201).json({
      method,
      url,
      message: "Se ha creado una sesión de forma exitosa (201) 👍",
      session: data,
    });
  };

  read = (req, res) => {
    const { method, originalUrl: url } = req;
    const sessionData = sessionsService.readSession(req.session);

    res.status(200).json({
      method,
      url,
      message: "Se ha leído una sesión de forma exitosa (200) 👍",
      session: sessionData,
    });
  };

  destroy = (req, res) => {
    const { method, originalUrl: url } = req;
    sessionsService.destroySession(req.session);

    res.status(200).json({
      method,
      url,
      message: "Se ha eliminado una sesión de forma exitosa (200) 👍",
    });
  };
}

const sessionsController = new SessionsController();
export default sessionsController;