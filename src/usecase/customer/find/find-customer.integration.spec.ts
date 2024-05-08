import { Sequelize } from "sequelize-typescript";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import FindCustomerUseCase from "./find-customer.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

describe("[INTEGRATION] Find customer use case", () => {
  let sut: FindCustomerUseCase;
  let customerRepository: CustomerRepositoryInterface;
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();

    customerRepository = new CustomerRepository();
    sut = new FindCustomerUseCase(customerRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customer = CustomerFactory.createWithAddress(
      "John Doe",
      new Address("street", 123, "zip", "city")
    );

    await customerRepository.create(customer);

    await expect(sut.execute({ id: customer.id })).resolves.toEqual({
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
});
