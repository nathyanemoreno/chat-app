import Joi from "joi";
import { Message } from "~/socket/types/Message";

const MessageSchema = Joi.object<Message>({
  recipients: Joi.alternatives(
    Joi.string(),
    Joi.array().items(Joi.string()),
  ).required(),
  text: Joi.string().required(),
});


const validateMessageData = (message: Message) => {
  const { value, error } = MessageSchema.validate(message);

  if (error) {
    throw new Error(error.message);
  }

  return value;
};

export { validateMessageData };
