import usersRepository from "../repositories/users.repository.js";

const authController = {
  async login(req, res) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

      res
        .cookie("token", user.token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000 // 1 hora
        })
        .json({
          message: "Login exitoso",
          user
        }); // 👈 RESPUESTA JSON compatible con fetch()
    } catch (err) {
      console.error("Error en login:", err);
      res.status(500).json({ error: "Error interno" });
    }
  },

  async register(req, res) {
    try {
      res.redirect("/login");
    } catch (err) {
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  },

  async signout(req, res) {
    try {
      const user = req.user;
      await usersRepository.update(user._id, { token: null });
      res.clearCookie("token");
      res.redirect("/login");
    } catch (err) {
      res.status(500).json({ error: "Error al cerrar sesión" });
    }
  },

  async online(req, res) {
    try {
      res.status(200).json({ message: "Usuario autenticado", user: req.user });
    } catch (err) {
      res.status(500).json({ error: "No se pudo verificar sesión" });
    }
  },

  async profile(req, res) {
    try {
      res.render("profile", { user: req.user });
    } catch (err) {
      console.error("Error al cargar perfil:", err);
      res.status(500).send("Error al cargar perfil");
    }
  },

  async badAuth(_, res) {
    res.status(401).json({ error: "Autenticación fallida" });
  },

  async denegado(_, res) {
    res.status(403).json({ error: "Acceso denegado" });
  }
};

export default authController;