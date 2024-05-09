import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list-product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("[INTEGRATION] ListProductUseCase", () => {
  let sequelize: Sequelize;
  const productRepository = new ProductRepository();
  const sut = new ListProductUseCase(productRepository);

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

  it("should list products", async () => {
    // Arrange
    const product1 = ProductFactory.create({ name: "Product 1", price: 1 });
    const product2 = ProductFactory.create({ name: "Product 2", price: 2 });
    await Promise.all([
      productRepository.create(product1),
      productRepository.create(product2),
    ]);

    // Act
    const result = await sut.execute({});

    // Assert
    expect(result.data).toHaveLength(2);
    expect(result.data).toEqual(
      expect.arrayContaining(
        [product1, product2].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
        }))
      )
    );
  });
});
