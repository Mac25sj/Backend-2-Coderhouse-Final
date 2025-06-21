import crypto from "crypto";

const { PERSISTENCE } = process.env;

class ProductDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }

    this.title = data.title?.trim();
    this.description = data.description || "";
    this.category = data.category || "Laptops";
    this.image =
      data.image ||
      "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg";
    this.price = data.price ?? 10;
    this.stock = data.stock ?? 10;
    this.onsale = data.onsale ?? false;

    if (data.owner_id) {
      this.owner_id = data.owner_id;
    }
  }
}

export default ProductDTO;