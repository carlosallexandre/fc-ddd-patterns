import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create-customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "../../../usecase/customer/list/list-customer.usecase";
import CustomerPresenter from "../presenters/customer.presenter";

export const customersRoute = express.Router();

customersRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const output = await usecase.execute({
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    });
    return res.send(output);
  } catch (err) {
    return res.status(500).send(err);
  }
});

customersRoute.get("/", async (_: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  const output = await usecase.execute({});

  res.format({
    json: () => res.send(output),
    xml: () => res.send(CustomerPresenter.listXML(output)),
  });
});
