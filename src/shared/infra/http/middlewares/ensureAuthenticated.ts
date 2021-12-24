import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<NextFunction | AppError | void> {
  const authHeader = req.headers.authorization;

  // Destruct Bearer Token
  const [, token] = authHeader.split(" ");

  if (!authHeader || !token) {
    throw new AppError("Token not provided", 401);
  }

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    req.user = {
      id: user_id,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
