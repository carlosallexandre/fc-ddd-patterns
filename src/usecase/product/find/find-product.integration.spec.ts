import { Sequelize } from "sequelize-typescript";
import FindProductUseCase from "./find-product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("[INTEGRATION] FindProductUseCase", () => {
  let sequelize: Sequelize;
  const productRepository = new ProductRepository();
  const sut = new FindProductUseCase(productRepository);

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    // Arrange
    const product = ProductFactory.create({ name: "ProductName", price: 22 });
    await productRepository.create(product);

    // Act
    const result = await sut.execute({ id: product.id });

    // Assert
    expect(result).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should throws an error when the product is not found", async () => {
    await expect(
      sut.execute({ id: "non-existent-product-id" })
    ).rejects.toThrow("Product not found");
  });
});
