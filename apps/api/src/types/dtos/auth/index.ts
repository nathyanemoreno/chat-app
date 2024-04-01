import { UserDTO } from "../user";

interface AuthSignInRequestBody {
  authToken: string;
}

interface AuthSignUpRequestBody {
  name: string;
  email: string;
  password: string;
  nickname: string;
}

interface AuthSignInResponseBody {
  user: UserDTO;
  token: string;
}

export type {
  AuthSignInRequestBody, AuthSignInResponseBody, AuthSignUpRequestBody
};
