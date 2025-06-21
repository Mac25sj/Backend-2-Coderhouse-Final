import fs from "fs/promises";
import path from "path";

class DaoFS {
  constructor(filename) {
    if (!filename) throw new Error("El archivo es requerido.");
    this.filePath = path.join(process.cwd(), "src/dao/fs", `${filename}.json`);
  }

  async _loadFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async _saveFile(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  createOne = async (item) => {
    const data = await this._loadFile();
    item.id = Date.now().toString(); // ID simple
    data.push(item);
    await this._saveFile(data);
    return item;
  };

  readAll = async () => await this._loadFile();

  readBy = async (filter) => {
    const data = await this._loadFile();
    return data.find((item) =>
      Object.entries(filter).every(([key, val]) => item[key] === val)
    );
  };

  readById = async (id) => {
    const data = await this._loadFile();
    return data.find((item) => item.id === id);
  };

  updateById = async (id, update) => {
    const data = await this._loadFile();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return null;
    data[index] = { ...data[index], ...update };
    await this._saveFile(data);
    return data[index];
  };

  destroyById = async (id) => {
    const data = await this._loadFile();
    const filtered = data.filter((item) => item.id !== id);
    await this._saveFile(filtered);
    return;
  };
}

const usersManager = new DaoFS("users");
const productsManager = new DaoFS("products");
const cartsManager = new DaoFS("carts");

export { usersManager, productsManager, cartsManager };