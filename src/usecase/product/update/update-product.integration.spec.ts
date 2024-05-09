import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update-product.usecase";

describe("[INTEGRATION] UpdateProductUseCase", () => {
  let sequelize: Sequelize;
  const product = ProductFactory.create({ name: "Product", price: 1 });
  const productRepository = new ProductRepository();
  const sut = new UpdateProductUseCase(productRepository);

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();

    await productRepository.create(product);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const input = { id: product.id, name: "Name updated", price: 23 };

    await expect(sut.execute(input)).resolves.toEqual({
      id: product.id,
      name: input.name,
      price: input.price,
    });
  });

  it("should throws an error when updating a non existing product", async () => {
    const input = { id: "non-existing-product-id", name: "name", price: 23 };
    await expect(sut.execute(input)).rejects.toThrow("Product not found");
  });

  it("should not be able to update a product to invalid name", async () => {
    const invalidName = "";
    const input = { id: product.id, name: invalidName, price: 23 };
    await expect(sut.execute(input)).rejects.toThrow("Name is required");
  });

  it("should not be able to update a product to invalid price", async () => {
    const invalidPrice = -1;
    const input = { id: product.id, name: "name", price: invalidPrice };
    await expect(sut.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
