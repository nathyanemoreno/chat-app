import { NextFunction, Request, Response } from "express";
import { mapUserModelToDTO } from "~/mappers/userMapper";
import { AuthSignInResponseBody } from "~/types/dtos/auth";
import { signToken } from "~/use-cases/auth-token/sign-token";
import { createUser } from "~/use-cases/users/create-user";
import { getUserByEmail } from "~/use-cases/users/get-by-email";
import { validateAuthSignUpParams } from "./validate";

export const authSignUpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = validateAuthSignUpParams(req.body);

    //Check if email is already in use
    const existingUser = await getUserByEmail(userData.email);

    if (existingUser) {
      return res
        .status(409)
        .send({ message: "Email already used with another account" });
    }

    //Create user on database
    const userFromDatabase = await createUser(userData);

    const userDTO = mapUserModelToDTO(userFromDatabase);

    const authToken = signToken({ userId: userDTO.id });

    return res
      .status(200)
      .send({ user: userDTO, token: authToken } as AuthSignInResponseBody);
  } catch (err) {
    next(err);
  }
};
