import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { compareHash,} from "../helpers/hash.util.js";
import usersRepository from "../repositories/users.repository.js";
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

        let user = await usersRepository.find({ email });
        if (user) {
          console.log("⚠️ El correo ya está registrado");
          return done(null, false, { message: "El correo ya está registrado" });
        }
        //Al usar repository que ya hasea
        //req.body.password = createHash(password);
        user = await usersRepository.create(req.body);

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

        let user = await usersRepository.find({ email });
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
        await usersRepository.update(user._id, { token });
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

// Estrategia JWT para usuarios comunes
passport.use(
  "current",
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.token || req?.signedCookies?.token,
      ]),
    },
    async (data, done) => {
      try {
        console.log("🔍 Datos extraídos del JWT:", data);

        const user = await usersRepository.find({ _id: new mongoose.Types.ObjectId(data._id) });

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

// Estrategia JWT para administradores
passport.use(
  "current_admin",
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.token || req?.signedCookies?.token,
      ]),
    },
    async (data, done) => {
      try {
        console.log("🔍 Datos extraídos del JWT:", data);

        const user = await usersRepository.find({ _id: new mongoose.Types.ObjectId(data._id) });

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