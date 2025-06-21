import dbConnect from "../helpers/dbConnect.helper.js";

const persistence = process.env.PERSISTENCE?.toUpperCase();

let usersManager, productsManager, cartsManager;

switch (persistence) {
  case "FS": {console.log("Estamos en el modo File Sistem");
  
    const { usersManager: fsUsers, productsManager: fsProducts, cartsManager: fsCarts } =
      await import("./fs/dao.fs.js");
    usersManager = fsUsers;
    productsManager = fsProducts;
    cartsManager = fsCarts;
    break;
  }

  case "MEMORY": {
    console.log("Modo MEMORY");
    
    const { usersManager: memUsers, productsManager: memProducts, cartsManager: memCarts } =
      await import("./memory/dao.memory.js");
    usersManager = memUsers;
    productsManager = memProducts;
    cartsManager = memCarts;
    break;
  }

  case "MONGO":
  default: {
    console.log("Conectados con Mongo Dd");
    
    await dbConnect(process.env.URL_MONGO);
    const { usersManager: mongoUsers, productsManager: mongoProducts, cartsManager: mongoCarts } =
      await import("./mongo/dao.mongo.js");
    usersManager = mongoUsers;
    productsManager = mongoProducts;
    cartsManager = mongoCarts;
    break;
  }
}

const dao = {
  users: usersManager,
  products: productsManager,
  carts: cartsManager,
};

export default dao;