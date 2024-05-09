import CreateProductUseCase from "./create-product.usecase";

const productRepository = {
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("[UNIT] CreateProductUseCase", () => {
  let sut = new CreateProductUseCase(productRepository);

  it("should create a product", async () => {
    const input = { name: "name", price: 1 };

    await expect(sut.execute(input)).resolves.toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should not be able to create a product with invalid name", async () => {
    const input = { name: "", price: 1 };

    await expect(sut.execute(input)).rejects.toThrow("Name is required");
  });

  it("should not be able to create a product with invalid price", async () => {
    const input = { name: "name", price: -10 };

    await expect(sut.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
