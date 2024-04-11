import jwt from "jsonwebtoken";
import { ENV_VARIABLES } from "~/config/env";
import { TokenDTO } from "./types";

export const verifyToken = async (token: string): Promise<TokenDTO> => {
  return new Promise<TokenDTO>((resolve, reject) => {
    jwt.verify(token, ENV_VARIABLES.JWT_SECRET, (err, result) => {
      if (err) return reject(err);

      resolve(result as TokenDTO);
    });
  });
};
