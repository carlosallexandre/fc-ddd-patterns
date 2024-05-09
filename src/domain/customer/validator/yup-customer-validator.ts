import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup";

export default class YupCustomerValidator
  implements ValidatorInterface<Customer>
{
  validate(entity: Customer) {
    try {
      yup
        .object({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
        })
        .validateSync({
          id: entity.id,
          name: entity.name,
        });
    } catch (err) {
      entity.addError(...(err as yup.ValidationError).errors);
    }
  }
}
