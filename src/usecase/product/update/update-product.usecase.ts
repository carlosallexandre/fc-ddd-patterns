import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductMapper from "../_mapper/product-mapper";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update-product.dto";

export default class UpdateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute({
    id,
    name,
    price,
  }: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.find(id);
    product.changeName(name);
    product.changePrice(price);
    product.validate();
    await this.productRepository.update(product);
    return ProductMapper.toOuput(product);
  }
}
