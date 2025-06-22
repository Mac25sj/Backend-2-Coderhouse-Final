import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { compareHash } from "../helpers/hash.util.js";
import usersRepository from "../repositories/users.repository.js";
import { createToken } from "../helpers/token.util.js";
import mongoose from "mongoose";

// Registro
passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const normalizedEmail = email.trim().toLowerCase();
        const exists = await usersRepository.findOne({ email: normalizedEmail });
        if (exists) return done(null, false, { message: "Correo ya registrado" });

        req.body.email = normalizedEmail;
        const user = await usersRepository.create(req.body);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Login
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const normalizedEmail = email.trim().toLowerCase();
        const user = await usersRepository.findOne({ email: normalizedEmail });
        if (!user) return done(null, false, { message: "Usuario no encontrado" });

        const isValid = compareHash(password, user.password);
        if (!isValid) return done(null, false, { message: "Contraseña incorrecta" });

        const token = createToken({
          _id: user._id.toString(),
          email: user.email,
          role: user.role?.toUpperCase?.()
        });

        await usersRepository.update(user._id, { token });
        user.token = token;

        return done(null, user);
      } catch (err) {
        console.log("🧪 Login exitoso:", user.email);
        return done(err);
      }
    }
  )
);

// JWT actual
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
        const user = await usersRepository.findOne({
          _id: new mongoose.Types.ObjectId(data._id),
        });
        if (!user) return done(null, false);
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

export default passport;