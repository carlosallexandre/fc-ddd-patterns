import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

export default class YupProductValidator
  implements ValidatorInterface<Product>
{
  validate(entity: Product): void {
    try {
      yup
        .object({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup.number().positive("Price must be greater than zero"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          { abortEarly: false }
        );
    } catch (error) {
      entity.addError(...(error as yup.ValidationError).errors);
    }
  }
}
