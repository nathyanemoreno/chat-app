import { User } from "~/model/User";
import { UserMock } from "~/mocks/UserMock";

//! TODO: Integrate with database
const getUserById = (userId: string): Promise<User | null> => {
  const userMock = new UserMock(userId, "Not Jon Doe", "Doye");

  return Promise.resolve(userMock as User);
};

export { getUserById };
