import { prisma } from "../db/prisma.js";

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
  if (!user) return null;

  const { password, ...rest } = user;
  return rest
};
