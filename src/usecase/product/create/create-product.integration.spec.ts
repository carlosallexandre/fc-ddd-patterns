import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "./create-product.usecase";

describe("[INTEGRATION] CreateProductUseCase", () => {
  const productRepository = new ProductRepository();
  const sut = new CreateProductUseCase(productRepository);

  let sequelize: Sequelize;

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

  it("should create a product", async () => {
    const input = { name: "name", price: 1 };

    await expect(sut.execute(input)).resolves.toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
