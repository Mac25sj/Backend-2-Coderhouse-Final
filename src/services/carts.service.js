import cartsRepository from "../repositories/carts.repository.js";

class CartsService {
  constructor() {
    this.repository = cartsRepository;
  }

  createOne = async (data) => this.repository.create(data);

  readAll = async (filter = {}) => this.repository.find(filter);

  readByID = async (id) => this.repository.findById(id);

  updateByID = async (id, data) => this.repository.update(id, data);

  destroyByID = async (id) => this.repository.delete(id);

  addItemToCart = async (userId, productId) => {
    let item = await this.repository.findOne({
      user_id: userId,
      product_id: productId,
      state: "reserved"
    });

    if (item) {
      item.quantity += 1;
      return await this.repository.update(item._id, { quantity: item.quantity });
    } else {
      return await this.repository.create({
        user_id: userId,
        product_id: productId,
        quantity: 1,
        state: "reserved"
      });
    }
  };

  checkoutReservedItems = async (userId) => {
    return await this.repository.updateMany(
      { user_id: userId, state: "reserved" },
      { state: "purchased" }
    );
  };
}

const cartsService = new CartsService();
export default cartsService;