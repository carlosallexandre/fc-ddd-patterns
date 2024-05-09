import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductMapper from "../_mapper/product-mapper";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create-product.dto";

export default class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute({
    name,
    price,
  }: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create({ name, price });
    await this.productRepository.create(product);
    return ProductMapper.toOuput(product);
  }
}
