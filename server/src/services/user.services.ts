import { logger } from "../config/loggerConfig.js";
import { prisma } from "../db/prisma.js";
import { AppError } from "../utils/AppError.js";

export const GetAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users.map(({ password, ...rest }) => rest);
};
export const GetUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    logger.error(`Failed to find user with id: ${userId}`);
    throw new AppError(`Failed to find user with id: ${userId}`, 404);
  }
  const { password, ...rest } = user;
  return rest;
};
