import { NextFunction, Request, Response } from "express";
import { mapUserModelToDTO } from "~/mappers/userMapper";
import { AuthSignInResponseBody } from "~/types/dtos/auth";
import { verifyToken } from "~/use-cases/auth-token/verify";
import { getUserById } from "~/use-cases/users/get-by-id";
import { validateAuthSignInParams } from "./validate";

export const authSignInController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authToken } = validateAuthSignInParams(req.body);

    const { userId } = await verifyToken(authToken);

    //Access database to get the user
    const userFromDatabase = await getUserById(userId);

    if (!userFromDatabase) {
      return res.status(401).send({ message: "User not found" });
    }

    const user = mapUserModelToDTO(userFromDatabase);

    return res
      .status(200)
      .send({ user: user, token: authToken } as AuthSignInResponseBody);
  } catch (err) {
    next(err);
  }
};
