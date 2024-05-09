import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list-product.usecase";

const product1 = ProductFactory.create({ name: "Product 1", price: 1 });
const product2 = ProductFactory.create({ name: "Product 2", price: 2 });

const productRepository = {
  find: jest.fn(),
  findAll: jest.fn().mockResolvedValue([product1, product2]),
  create: jest.fn(),
  update: jest.fn(),
};

describe("[UNIT] ListProductUseCase", () => {
  let sut = new ListProductUseCase(productRepository);

  it("should list products", async () => {
    const result = await sut.execute({});

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
