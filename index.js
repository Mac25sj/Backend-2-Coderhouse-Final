import "./src/helpers/env.helper.js"
import express, { json, urlencoded } from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//import session from "express-session";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import dbConnect from "./src/helpers/dbConnect.helper.js";
import argsHelper from "./src/helpers/args.helper.js";
//import MongoStore from "connect-mongo";
// Configuración del Servidor
const server = express();
const port = process.env.PORT || 8080;

const ready = async () => {
  try {
    await dbConnect(process.env.URL_MONGO);
    console.log(`El servidor está listo en el puerto: ${port}`);
    console.log("Modo de: " + argsHelper.mode);
    
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
  }
};

server.listen(port, ready);

// Configuración del Motor de Plantillas
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// Configuración de Middlewares

//server.use(session({secret: process.env.SECRET,resave: true,saveUninitialized: true, store: new MongoStore({ mongoUrl: process.env.URL_MONGO,ttl: 7 * 24 * 60 * 60,})}));

server.use(cookieParser(process.env.SECRET));
server.use(urlencoded({ extended: true }));
server.use(json());
server.use(express.static("public"));
server.use(morgan("dev"));

// Configuración de Enrutamiento
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);


