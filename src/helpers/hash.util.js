import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (pass) => (pass, genSaltSync(10));

const compareHash = (pass, dbPass) => compareSync(pass, dbPass);

export { createHash, compareHash };
