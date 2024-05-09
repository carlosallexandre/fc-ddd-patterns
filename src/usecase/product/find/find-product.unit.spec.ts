import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find-product.usecase";

const product = ProductFactory.create({ name: "Product", price: 25.99 });

const productRepository = {
  find: jest.fn().mockResolvedValue(product),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("[UNIT] FindProductUseCase", () => {
  let sut: FindProductUseCase;

  beforeEach(() => {
    sut = new FindProductUseCase(productRepository);
  });

  it("should find a product", async () => {
    await expect(sut.execute({ id: product.id })).resolves.toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should throws an error for non existing product", async () => {
    productRepository.find.mockImplementationOnce(() => {
      throw Error("Product not found");
    });

    await expect(sut.execute({ id: "fake-product-id" })).rejects.toThrow(
      "Product not found"
    );
  });
});
