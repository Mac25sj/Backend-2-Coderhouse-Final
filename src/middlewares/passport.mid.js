import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { compareHash, createHash } from "../helpers/hash.util.js";
import { usersManager } from "../data/manager.mongo.js";
import { createToken } from "../helpers/token.util.js";
import mongoose from "mongoose"; 

const callbackUrl = "http://localhost:8080/api/auth/google/redirect";

// Estrategia de registro
passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        console.log("📡 Intento de registro con email:", email);

        if (!email || !password) {
          console.log("❌ Datos insuficientes");
          return done(null, false, { message: "Datos inválidos o insuficientes" });
        }

        let user = await usersManager.readBy({ email });
        if (user) {
          console.log("⚠️ El correo ya está registrado");
          return done(null, false, { message: "El correo ya está registrado" });
        }

        req.body.password = createHash(password);
        user = await usersManager.createOne(req.body);

        console.log("✅ Usuario registrado correctamente:", user);
        return done(null, user);
      } catch (error) {
        console.error("⚠️ Error en la estrategia de registro:", error);
        return done(error);
      }
    }
  )
);

// Estrategia de login
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        console.log("📡 Intento de login con email:", email);

        let user = await usersManager.readBy({ email });
        if (!user) {
          console.log("❌ Usuario no encontrado");
          return done(null, false, { message: "Credenciales inválidas" });
        }

        console.log("✅ Usuario encontrado:", user);

        const verify = await compareHash(password, user.password);
        if (!verify) {
          console.log("❌ Contraseña incorrecta");
          return done(null, false, { message: "Credenciales inválidas" });
        }

        console.log("✅ Contraseña verificada correctamente");

        const data = {
          _id: user._id.toString(), 
          role: user.role,
          email,
        };

        const token = createToken(data);
        await usersManager.model.findByIdAndUpdate(user._id, { token }, { new: true });
        user.token = token;

        console.log("✅ Token generado y almacenado:", token);
        return done(null, user);
      } catch (error) {
        console.error("⚠️ Error en la estrategia de login:", error);
        return done(error);
      }
    }
  )
);

// Estrategia de autenticación con JWT para usuarios comunes
passport.use(
  "current",
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.token || req?.signedCookies?.token]),
    },
    async (data, done) => {
      try {
        console.log("🔍 Datos extraídos del JWT:", data);

        const user = await usersManager.readBy({ _id: new mongoose.Types.ObjectId(data._id) });

        if (!user) {
          const error = new Error("Ingreso denegado, no se encontró el usuario");
          error.statusCode = 403;
          throw error;
        }
        done(null, user);
      } catch (error) {
        console.error("⚠️ Error en autenticación JWT:", error);
        done(error);
      }
    }
  )
);

// Estrategia de autenticación con JWT para administradores
passport.use(
  "current_admin",
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.token || req?.signedCookies?.token]),
    },
    async (data, done) => {
      try {
        console.log("🔍 Datos extraídos del JWT:", data);

        // 🛠 Convertir `_id` a `ObjectId` antes de la consulta
        const user = await usersManager.readBy({ _id: new mongoose.Types.ObjectId(data._id) });

        if (!user || user.role !== "ADMIN") {
        const error = new Error("Ingreso denegado, usuario no encontrado o sin permisos");
          error.statusCode = 403;
          throw error;  
        }

        console.log("✅ Usuario autenticado correctamente:", user);
        done(null, user);
      } catch (error) {
        console.error("⚠️ Error en autenticación de administrador:", error);
        done(error);
      }
    }
  )
);

export default passport;