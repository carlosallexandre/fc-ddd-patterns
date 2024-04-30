import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: true,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update an order", async () => {
    // Arrange
    const orderRepository = new OrderRepository();

    const c1 = new Customer("c1", "customer1");
    await CustomerModel.create({
      id: c1.id,
      name: c1.name,
      active: c1.isActive(),
      rewardPoints: c1.rewardPoints,
      zipcode: "",
      city: "",
      street: "",
      number: 0,
    });

    const c2 = new Customer("c2", "customer2");
    await CustomerModel.create({
      id: c2.id,
      name: c2.name,
      active: c2.isActive(),
      rewardPoints: c2.rewardPoints,
      zipcode: "",
      city: "",
      street: "",
      number: 0,
    });

    const product = new Product("p1", "product1", 10);
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    const order = new Order("o1", c1.id, [
      new OrderItem("oi1", "name", product.price, product.id, 1),
    ]);
    await OrderModel.create(
      {
        id: order.id,
        customer_id: order.customerId,
        total: order.total(),
        items: order.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
      { include: ["items"] }
    );

    // Act
    order.addItem(product, 4);
    await orderRepository.update(order);

    // Assert
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: order.items.map((item) => ({
        id: item.id,
        order_id: order.id,
        product_id: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  });

  it("should find an order", async () => {
    const orderRepository = new OrderRepository();

    const customer = new Customer("c1", "customer1");
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      zipcode: "",
      city: "",
      street: "",
      number: 0,
    });

    const product = new Product("p1", "product1", 10);
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    const order = new Order("o1", customer.id, [
      new OrderItem("oi1", "name", product.price, product.id, 1),
    ]);
    await OrderModel.create(
      {
        id: order.id,
        customer_id: order.customerId,
        total: order.total(),
        items: order.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
      { include: ["items"] }
    );

    const orderFounded = await orderRepository.find(order.id);

    expect(orderFounded).toEqual(order);
  });

  it("should find all orders", async () => {
    const orderRepository = new OrderRepository();

    const customer = new Customer("c1", "customer1");
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      zipcode: "",
      city: "",
      street: "",
      number: 0,
    });

    const product = new Product("p1", "product1", 10);
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    const o1 = new Order("o1", customer.id, [
      new OrderItem("oi1", "name", product.price, product.id, 1),
      new OrderItem("oi2", "name", product.price, product.id, 1),
    ]);
    await OrderModel.create(
      {
        id: o1.id,
        customer_id: o1.customerId,
        total: o1.total(),
        items: o1.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
      { include: ["items"] }
    );

    const o2 = new Order("o2", customer.id, [
      new OrderItem("oi1", "name", product.price, product.id, 1),
    ]);
    await OrderModel.create(
      {
        id: o2.id,
        customer_id: o2.customerId,
        total: o2.total(),
        items: o2.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
      { include: ["items"] }
    );

    const orders = await orderRepository.findAll();

    expect(orders).toEqual([o1, o2]);
  });
});
