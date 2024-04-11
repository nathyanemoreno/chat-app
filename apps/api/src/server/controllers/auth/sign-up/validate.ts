import Joi from "joi";
import { AuthSignUpRequestBody } from "~/types/dtos/auth";

const validateAuthSignUpParams = (
  data: AuthSignUpRequestBody,
): AuthSignUpRequestBody => {
  const schema = Joi.object<AuthSignUpRequestBody>({
    email: Joi.string().email().max(100).required(),
    name: Joi.string().min(3).max(255).required(),
    nickname: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}")).required(),
  });

  const { value, error } = schema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  return value;
};

export { validateAuthSignUpParams };
