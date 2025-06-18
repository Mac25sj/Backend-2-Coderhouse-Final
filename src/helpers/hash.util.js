import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (pass) => hashSync(pass, genSaltSync(10)); // Aquí estaba el error

const compareHash = (pass, dbPass) => compareSync(pass, dbPass);

export { createHash, compareHash };