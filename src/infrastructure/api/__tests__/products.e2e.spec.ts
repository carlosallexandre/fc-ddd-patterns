import { app, sequelize } from "../express";
import request from "supertest";

describe("[E2E] Products", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    // prettier-ignore
    const response = await request(app)
      .post("/products")
      .send({
        name: "Product",
        price: 1,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: "Product",
      price: 1,
    });
  });

  it("should not be able to create a product", async () => {
    // prettier-ignore
    const response = await request(app)
      .post("/products")
      .send({
        name: "Product",
        price: -1,
      });

    expect(response.statusCode).toBe(500);
  });

  it("should list all products", async () => {
    const products = [
      { name: "Product 1", price: 1 },
      { name: "Product 2", price: 2 },
    ];
    await Promise.all(
      products.map((p) => request(app).post("/products").send(p))
    );

    const response = await request(app).get("/products").send();

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(
      expect.arrayContaining(products.map(expect.objectContaining))
    );
  });

  it("should find a product", async () => {
    const createResponse = await request(app)
      .post("/products")
      .send({ name: "Product 1", price: 1 });
    const productId = createResponse.body.id;

    const response = await request(app).get(`/products/${productId}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: productId,
      name: "Product 1",
      price: 1,
    });
  });

  it("should update a product", async () => {
    const createResponse = await request(app)
      .post("/products")
      .send({ name: "Product 1", price: 1 });
    const productId = createResponse.body.id;

    const response = await request(app)
      .put(`/products/${productId}`)
      .send({ name: "Product updated", price: 24.99 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: productId,
      name: "Product updated",
      price: 24.99,
    });
  });
});
