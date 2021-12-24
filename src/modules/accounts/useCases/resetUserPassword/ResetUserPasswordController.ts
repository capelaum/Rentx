import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

class ResetUserPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;
    const { password } = req.body;

    const resetUserPasswordUseCase = container.resolve(
      ResetUserPasswordUseCase
    );

    await resetUserPasswordUseCase.execute({ token: String(token), password });

    return res.send();
  }
}

export { ResetUserPasswordController };
