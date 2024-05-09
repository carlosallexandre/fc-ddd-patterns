import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductMapper from "../_mapper/product-mapper";
import { InputFindProductDto, OutputFindProductDto } from "./find-product.dto";

export default class FindProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id);
    return ProductMapper.toOuput(product);
  }
}
