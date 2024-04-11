import Joi from "joi";
import { AuthSignInRequestBody } from "~/types/dtos/auth";

const validateAuthSignInParams = (
  data: AuthSignInRequestBody,
): AuthSignInRequestBody => {
  const schema = Joi.object<AuthSignInRequestBody>({
    authToken: Joi.string().required(),
  });

  const { value, error } = schema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  return value;
};

export { validateAuthSignInParams };
