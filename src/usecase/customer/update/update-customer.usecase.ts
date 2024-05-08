import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from "./update-customer.dto";

export default class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute({
    id,
    name,
    address,
  }: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(id);

    customer.changeName(name);
    customer.changeAddress(
      new Address(address.street, address.number, address.zip, address.city)
    );

    await this.customerRepository.update(customer);

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
