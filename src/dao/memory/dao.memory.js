class DaoMemory {
  constructor() {
    this.items = [];
  }

  createOne = async (item) => {
    item.id = Date.now().toString();
    this.items.push(item);
    return item;
  };

  readAll = async () => [...this.items];

  readBy = async (filter) =>
    this.items.find((item) =>
      Object.entries(filter).every(([key, val]) => item[key] === val)
    );

  readById = async (id) => this.items.find((item) => item.id === id);

  updateById = async (id, update) => {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return null;
    this.items[index] = { ...this.items[index], ...update };
    return this.items[index];
  };

  destroyById = async (id) => {
    this.items = this.items.filter((item) => item.id !== id);
  };
}

const usersManager = new DaoMemory();
const productsManager = new DaoMemory();
const cartsManager = new DaoMemory();

export { usersManager, productsManager, cartsManager };