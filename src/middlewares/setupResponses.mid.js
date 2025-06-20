import { response } from "express";

//Nota se aplica antes que el aplicador de callbacks
const setupResponses = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = { method, url };
    const messages = {
      200: "Todo ha salido correctamente",
      201: "Creado correctamente",
      400: "Error del cliente",
      401: "No se ha podido autentificar de forma correcta",
      403: "Acceso denegado",
      404: "No encontrado",
      500: "Error en el servidor",
    };
    //Funcion para cosntruir respuesta generica de éxito
    const successRes = (code, response, message = messages[code]) =>
      res.status(code).json({ ...data, response, message });
    res.json200 = (response, message) => successRes(200, response, message);
    res.json201 = (response, message) => successRes(201, response, message);
    const errorRes = (code, message = messages[code]) => {
      const error = new Error(message);
      error.statusCode = code;
      throw error;
    };
    res.json400 = (message) => errorRes(400, message);
    res.json401 = (message) => errorRes(401, message);
    res.json403 = (message) => errorRes(403, message);
    res.json404 = (message) => errorRes(404, message);
    res.json500 = (message) => errorRes(500, message);
    //Dejo pasar con next
    next();
  } catch (error) {
    next(error);
  }
};

export default setupResponses;
