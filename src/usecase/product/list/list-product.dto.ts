export interface InputListProductDto {}

export interface OutputListProductDto {
  data: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}
