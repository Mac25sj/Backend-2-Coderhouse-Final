import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { compareHash, createHash } from "../helpers/hash.util.js";
import { usersManager } from "../data/manager.mongo.js";
import { token } from "morgan";

const callbackUrl = "http://localhost:8080/api/auth/google/redirect"; // README contiene los datos de Google

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          console.log("Datos insuficientes");
          return done(new Error("Datos inválidos o insuficientes"), false);
        }

        let user = await usersManager.readBy({ email });
        if (user) {
          console.log("El correo ya está registrado");
          return done(new Error("El correo ya está registrado"), false);
        }

        req.body.password = createHash(password); // Hasheo de la contraseña
        user = await usersManager.createOne(req.body);

        console.log("Usuario registrado:", user);
        return done(null, user); // Asegura que 'done' se llama correctamente

      } catch (error) {
        console.error("Error en la estrategia de registro:", error);
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await usersManager.readBy({ email });

        if (!user) {
          return done(new Error("Credenciales inválidas"), false);
        }

        const verify = await compareHash(password, user.password); 
        if (!verify) {
          return done(new Error("Credenciales inválidas"), false);
        }
        const data = {
          _id : user._id,
          role:user.role,
          email
        }
        const token = createToken(data)
        user.token=tocken
        done(null, user); 
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: callbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, given_name, picture } = profile; 
        let user = await usersManager.readBy({ email });

        if (!user) {
          user = await usersManager.createOne({
            first_name: given_name,
            last_name: "", 
            email,
            age: null, 
            password: createHash("random-password-" + email), 
            cart: null, 
            role: "user",
          });
        }
        const token = createToken(data)
        user.token=tocken
        done(null, user); 

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
/*1)Nombre de la estrategía
  2) Constructor de la estrategía 
  3) En parámetros, objeto de contrucción de la estrategía
  4)Callback con la lógica de la estrategía
  */
