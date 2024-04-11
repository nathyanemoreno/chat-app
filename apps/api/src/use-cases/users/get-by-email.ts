import { UserMock } from "~/mocks/UserMock";
import { User } from "~/model/User";

//! TODO: Integrate with database
const getUserByEmail = (userId: string): Promise<User | null> => {
  const userMock = new UserMock(
    userId,
    "Not Jon Doe",
    "Johnny",
    "notjohndoe@gmail.com",
    "12345678",
  );

  return Promise.resolve(userMock as User);
};

export { getUserByEmail };
