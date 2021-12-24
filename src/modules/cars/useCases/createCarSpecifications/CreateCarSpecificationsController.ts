import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationsUseCase";

class CreateCarSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecificationsUseCase = container.resolve(
      CreateCarSpecificationsUseCase
    );

    const car = await createCarSpecificationsUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return res.status(201).send({ message: "Car specifications created", car });
  }
}

export { CreateCarSpecificationsController };
