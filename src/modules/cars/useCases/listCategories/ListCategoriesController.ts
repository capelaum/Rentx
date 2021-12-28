import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUsecase = container.resolve(ListCategoriesUseCase);
    const allCategories = await listCategoriesUsecase.execute();

    return res.json(allCategories);
  }
}

export { ListCategoriesController };
