import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list-customer.dto";

export default class ListCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    return { data: customers.map(CustomerMapper.toOuput) };
  }
}

class CustomerMapper {
  static toOuput(customer: Customer) {
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
