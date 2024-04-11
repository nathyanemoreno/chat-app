import { User } from "~/model/User";
import { UserDTO } from "~/types/dtos/user";

export const mapUserModelToDTO = (userModel: User): UserDTO => {
  return {
    id: userModel.id,
    name: userModel.name,
    password: userModel.password,
    nickname: userModel.nickname,
  };
};

export const mapUserDTOToModel = (userModel: UserDTO): User => {
  return {
    id: userModel.id,
    name: userModel.name,
    password: userModel.password,
    nickname: userModel.nickname,
  };
};
