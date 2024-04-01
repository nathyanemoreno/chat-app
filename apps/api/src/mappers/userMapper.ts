import { User } from "~/model/User";
import { UserDTO } from "~/types/dtos/user";

export const mapUserModelToDTO = (userModel: User): UserDTO => {
  return {
    id: userModel.id.toString(),
    name: userModel.name.toString(),
    password: userModel.password,
    nickname: userModel.nickname,
  };
};
