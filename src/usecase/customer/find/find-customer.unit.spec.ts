import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find-customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("street", 123, "zip", "city")
);

const MockRepository = () => ({
  find: jest.fn().mockResolvedValue(customer),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("[UNIT] Find customer use case", () => {
  let sut: FindCustomerUseCase;
  let customerRepository: ReturnType<typeof MockRepository>;

  beforeEach(() => {
    customerRepository = MockRepository();
    sut = new FindCustomerUseCase(customerRepository);
  });

  it("should find a customer", () => {
    expect(sut.execute({ id: customer.id })).resolves.toEqual({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
      },
    });
  });

  it("should not find a customer", () => {
    customerRepository.find.mockImplementationOnce(() => {
      throw new Error("Customer not found");
    });

    expect(sut.execute({ id: "non-existent-customer-id" })).rejects.toThrow(
      "Customer not found"
    );
  });
});
