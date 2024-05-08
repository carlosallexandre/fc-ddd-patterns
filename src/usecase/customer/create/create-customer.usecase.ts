import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create-customer.dto";

export default class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute({
    name,
    address,
  }: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      name,
      new Address(address.street, address.number, address.zip, address.city)
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
      },
    };
  }
}
