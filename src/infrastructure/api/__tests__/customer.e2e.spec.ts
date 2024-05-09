import { app, sequelize } from "../express";
import request from "supertest";

describe("[E2E] Customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John Doe",
        address: { street: "street", city: "city", number: 123, zip: "zip" },
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: "John Doe",
      address: { street: "street", city: "city", number: 123, zip: "zip" },
    });
  });

  it("should not be able to create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({ name: "John Doe" });

    expect(response.statusCode).toBe(500);
  });

  it("should list customers", async () => {
    const customers = [
      {
        name: "John Doe",
        address: { street: "street", city: "city", number: 123, zip: "zip" },
      },
      {
        name: "Jane Doe",
        address: { street: "street", city: "city", number: 123, zip: "zip" },
      },
    ];
    await Promise.all(
      customers.map((c) => request(app).post("/customers").send(c))
    );

    const response = await request(app).get("/customers").send();

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(
      expect.arrayContaining(customers.map(expect.objectContaining))
    );
  });
});
