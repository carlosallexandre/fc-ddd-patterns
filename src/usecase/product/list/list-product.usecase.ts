import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductMapper from "../_mapper/product-mapper";
import { InputListProductDto, OutputListProductDto } from "./list-product.dto";

export default class ListProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return { data: products.map(ProductMapper.toOuput) };
  }
}
