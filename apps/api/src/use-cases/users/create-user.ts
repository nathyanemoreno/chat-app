import { UserMock } from "~/mocks/UserMock";
import { User } from "~/model/User";
import { CreateUserParams } from "~/types/dtos/user";

//! TODO: Integrate with database
const createUser = async (userData: CreateUserParams): Promise<User> => {
  const userMock = new UserMock("1", "Not John Doe", "John Doe","notjohndoe@gmail.com", "12345678");

  return userMock;
};

export { createUser };
