import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import YupProductValidator from "../validator/yup-product-validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new YupProductValidator();
  }
}
