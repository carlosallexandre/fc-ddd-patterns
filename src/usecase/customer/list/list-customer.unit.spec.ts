import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list-customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("street", 1, "zip", "city")
);

const customer2 = CustomerFactory.createWithAddress(
  "Anny Doe",
  new Address("street", 1, "zip", "city")
);

const customerRepository = {
  find: jest.fn(),
  findAll: jest.fn().mockResolvedValue([customer1, customer2]),
  create: jest.fn(),
  update: jest.fn(),
};

describe("[UNIT] ListCustomerUseCase", () => {
  let sut: ListCustomerUseCase;

  beforeAll(() => {
    sut = new ListCustomerUseCase(customerRepository);
  });

  it("should list customers", async () => {
    const result = await sut.execute({});

    expect(result.data).toHaveLength(2);
    expect(result.data).toEqual(
      expect.arrayContaining([
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.Address.street,
            city: customer2.Address.city,
            number: customer2.Address.number,
            zip: customer2.Address.zip,
          },
        },
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.Address.street,
            city: customer1.Address.city,
            number: customer1.Address.number,
            zip: customer1.Address.zip,
          },
        },
      ])
    );
  });
});
