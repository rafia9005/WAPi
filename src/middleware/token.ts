import { NextFunction, Request, Response } from "express";
import { ENV } from "../env";

const secret = ENV.SECRET_TOKEN

export async function Token(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers["x-token"] as string;

  if (!token) {
    res.status(401).json({
      message: "Headers x-token is required.",
    });
  }

  if (token == secret) {
    return next();
  } else {
    res.status(401).json({
      message: "Token is invalid.",
    });
    return;
  }
}
