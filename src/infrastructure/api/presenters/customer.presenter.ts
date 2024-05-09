import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list-customer.dto";

export default class CustomerPresenter {
  static listXML(data: OutputListCustomerDto): string {
    return toXML(
      {
        customers: {
          customer: data.data.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              city: customer.address.city,
              number: customer.address.number,
              zip: customer.address.zip,
            },
          })),
        },
      },
      {
        header: true,
        indent: " ",
      }
    );
  }
}
