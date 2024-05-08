import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update-customer.usecase";

describe("[UNIT] UpdateCustomerUseCase", () => {
  let sut: UpdateCustomerUseCase;
  const customer = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("street", 123, "zip", "city")
  );

  beforeEach(() => {
    const customerRepository = {
      find: jest.fn().mockResolvedValue(customer),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
    sut = new UpdateCustomerUseCase(customerRepository);
  });

  it("should update a customer", async () => {
    const input = {
      id: customer.id,
      name: "Name updated",
      address: {
        street: "Street updated",
        city: "City updated",
        number: 12345,
        zip: "Zip updated",
      },
    };

    await expect(sut.execute(input)).resolves.toEqual(input);
  });
});
