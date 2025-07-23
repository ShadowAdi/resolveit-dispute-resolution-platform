import { NextFunction, Request, Response } from "express";
import { logger } from "../config/loggerConfig.js";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/DotEnvConfig.js";

export const CheckAuth = async (
  req: Request,
  response: Response,
  next: NextFunction
) => {
  if (!JWT_SECRET) {
    console.log("Jwt Secret Key is not found ", JWT_SECRET);
    logger.error("Jwt Secret Key is not found " + JWT_SECRET);
    throw new AppError(`Internal Server Error`, 500);
  }
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const message = `Token not provided or invalid format. Header: ${authHeader}`;
      logger.error(message);
      return next(new AppError(message, 401));
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    if (typeof decoded !== "string" && decoded.sub && decoded.email) {
      req.user = {
        sub: decoded.sub,
        email: decoded.email,
      };
      return next();
    } else {
      return next(new AppError("Invalid token payload", 401));
    }
  } catch (error: any) {
    logger.error("Error in checking auth: " + error.message);
    return next(new AppError("Unauthorized access", 401));
  }
};