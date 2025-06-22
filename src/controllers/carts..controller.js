import cartsService from "../services/carts.service.js";

class CartsController {
  createOne = async (req, res) => {
    try {
      const result = await cartsService.createOne(req.body);
      res.json201(result._id);
    } catch (err) {
      res.json500("Error al crear ítem en el carrito");
    }
  };

  readAll = async (_req, res) => {
    try {
      const all = await cartsService.readAll();
      all.length > 0
        ? res.json200(all)
        : res.json404("No se encontraron ítems de carrito");
    } catch (err) {
      res.json500("Error al obtener ítems de carrito");
    }
  };

  readByID = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await cartsService.readByID(id);
      item
        ? res.json200(item)
        : res.json404("Ítem no encontrado");
    } catch (err) {
      res.json500("Error al buscar ítem de carrito");
    }
  };

  updateByID = async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await cartsService.updateByID(id, req.body);
      updated
        ? res.json200(updated)
        : res.json404("Ítem no encontrado para actualizar");
    } catch (err) {
      res.json500("Error al actualizar ítem de carrito");
    }
  };

  destroyByID = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await cartsService.destroyByID(id);
      deleted
        ? res.json200(deleted)
        : res.json404("Ítem no encontrado para eliminar");
    } catch (err) {
      res.json500("Error al eliminar ítem de carrito");
    }
  };

  addToCart = async (req, res) => {
    try {
      const userId = req.user._id;
      const { pid } = req.params;

      const added = await cartsService.addItemToCart(userId, pid);
      return added
        ? res.redirect("/cart")
        : res.json500("No se pudo agregar al carrito");
    } catch (err) {
      res.status(500).send("Error al agregar al carrito");
    }
  };

  getUserCart = async (req, res) => {
    try {
      const items = await cartsService.readAll({
        user_id: req.user._id,
        state: "reserved"
      });
      res.render("cart", { cartItems: items });
    } catch (err) {
      res.status(500).send("Error al obtener el carrito");
    }
  };

  checkout = async (req, res) => {
    try {
      const userId = req.user._id;
      await cartsService.checkoutReservedItems(userId);
      res.redirect("/api/carts/confirmation");
    } catch (err) {
      res.status(500).send("Error al procesar el checkout");
    }
  };

  confirmationView = async (_req, res) => {
    try {
      res.render("confirmation", {
        title: "Compra realizada",
        message: "¡Gracias por tu compra! Tu pedido está siendo procesado.",
      });
    } catch (err) {
      res.status(500).send("Error al cargar la vista de confirmación");
    }
  };
}

const cartsController = new CartsController();
export default cartsController;