import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import YupCustomerValidator from "../validator/yup-customer-validator";

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new YupCustomerValidator();
  }
}
