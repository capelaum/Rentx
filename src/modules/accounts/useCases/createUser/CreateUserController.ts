import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, driver_license, password } = req.body;
    const createUsersUseCase = container.resolve(CreateUserUseCase);

    await createUsersUseCase.execute({
      name,
      email,
      driver_license,
      password,
    });

    return res.status(201).json({ message: "Usuário criado com sucesso" });
  }
}

export { CreateUserController };
