import ProductInterface from "../../../domain/product/entity/product.interface";

export default class ProductMapper {
  static toOuput(product: ProductInterface) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
