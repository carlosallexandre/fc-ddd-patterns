export interface InputListCustomerDto {}

export interface OutputListCustomerDto {
  data: Array<{
    id: string;
    name: string;
    address: {
      street: string;
      city: string;
      number: number;
      zip: string;
    };
  }>;
}
