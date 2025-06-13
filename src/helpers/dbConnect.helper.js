import { connect } from "mongoose";

const dbConnect = async (url) => {
  try {
    await connect(url);
    console.log("Conectado a la base de datos correctamente");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
