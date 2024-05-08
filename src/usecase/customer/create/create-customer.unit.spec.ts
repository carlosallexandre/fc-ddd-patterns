import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import CreateCustomerUseCase from "./create-customer.usecase";

describe("[UNIT] CreateCustomerUseCase", () => {
  let sut: CreateCustomerUseCase;
  let customerRepository: CustomerRepositoryInterface;

  beforeEach(() => {
    customerRepository = {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
    sut = new CreateCustomerUseCase(customerRepository);
  });

  it("should create a customer", async () => {
    await expect(
      sut.execute({
        name: "John Doe",
        address: { street: "street", city: "city", number: 123, zip: "zip" },
      })
    ).resolves.toEqual({
      id: expect.any(String),
      name: "John Doe",
      address: { street: "street", city: "city", number: 123, zip: "zip" },
    });
  });

  it("should throws an error when name is missing", async () => {
    await expect(
      sut.execute({
        name: "",
        address: { street: "street", city: "city", number: 123, zip: "zip" },
      })
    ).rejects.toThrow("Name is required");
  });
});
