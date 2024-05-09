import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update-product.usecase";

const product = ProductFactory.create({ name: "Product", price: 1 });

const productRepository = {
  find: jest.fn().mockResolvedValue(product),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("[UNIT] UpdateProductUseCase", () => {
  let sut = new UpdateProductUseCase(productRepository);

  it("should update a product", async () => {
    const input = { id: product.id, name: "Name updated", price: 23 };

    await expect(sut.execute(input)).resolves.toEqual({
      id: product.id,
      name: input.name,
      price: input.price,
    });
  });

  it("should throws an error when updating a non existing product", async () => {
    productRepository.find.mockImplementationOnce(() => {
      throw new Error("Product not found");
    });
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
