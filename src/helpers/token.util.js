import jwt from "jsonwebtoken";

const createToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.SECRET, { expiresIn: "7d" }); 
    return token;
  } catch (error) {
    console.error("⚠️ Error al crear el token:", error);
    error.statusCode = 401;
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.SECRET);
    return data; 
  } catch (error) {
    console.error("⚠️ Error al verificar el token:", error);
    error.statusCode = 401;
    throw error;
  }
};

export { createToken, verifyToken };