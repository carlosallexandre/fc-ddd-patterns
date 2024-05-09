import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create-product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list-product.usecase";
import FindProductUseCase from "../../../usecase/product/find/find-product.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update-product.usecase";

export const productsRoutes = express.Router();

productsRoutes.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());

  try {
    const output = await usecase.execute({
      name: req.body.name,
      price: req.body.price,
    });

    return res.send(output);
  } catch (err) {
    return res.status(500).send(err);
  }
});

productsRoutes.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const output = await usecase.execute({});
  return res.send(output);
});

productsRoutes.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindProductUseCase(new ProductRepository());

  try {
    const output = await usecase.execute({ id: req.params.id });
    return res.send(output);
  } catch (err) {
    return res.sendStatus(404);
  }
});

productsRoutes.put("/:id", async (req: Request, res: Response) => {
  const usecase = new UpdateProductUseCase(new ProductRepository());

  try {
    const output = await usecase.execute({
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
    });
    return res.send(output);
  } catch (err) {
    return res.status(500).send(err);
  }
});
