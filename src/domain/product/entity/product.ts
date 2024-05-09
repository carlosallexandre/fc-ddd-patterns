import Entity from "../../@shared/entity/entity.abstract";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super("product");
    this.id = id;
    this.name = name;
    this.price = price;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  private set name(val: string) {
    if (val.length === 0) this.addError("Name is required");
    this._name = val;
  }

  get price(): number {
    return this._price;
  }

  private set price(val: number) {
    if (val < 0) this.addError("Price must be greater than zero");
    this._price = val;
  }

  changeName(name: string): void {
    this.name = name;
  }

  changePrice(price: number): void {
    this.price = price;
  }
}
