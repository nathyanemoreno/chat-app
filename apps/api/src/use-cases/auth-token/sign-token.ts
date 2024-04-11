import jwt from "jsonwebtoken";
import { TokenDTO } from "./types";
import { ENV_VARIABLES } from "~/config/env";

const signToken = (payload: TokenDTO): string => {
  const token = jwt.sign(payload, ENV_VARIABLES.JWT_SECRET);

  return token;
};

export { signToken };
