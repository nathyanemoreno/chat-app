import { hashPassword } from "../../utils/hash";
import { Context } from "../context";

interface CreateUser {
  name: string;
  email: string;
  password: string;
  nickname: string;
}

export async function createUser(user: CreateUser, ctx: Context) {
  return await ctx.prisma.user.create({
    data: {
      ...user,
      password: await hashPassword(user.password),
    },
  });
}

interface UpdateUser {
  id: string;
  name: string;
  email: string;
  password: string;
  nickname: string;
}

export async function updateUsername(user: UpdateUser, ctx: Context) {
  return await ctx.prisma.user.update({
    where: { id: user.id },
    data: {
      ...user,
      password: await hashPassword(user.password),
    },
  });
}
