interface UserDTO {
  id: string;
  name: string;
  password: string;
  nickname: string;
}

interface CreateUserParams {
  name: string;
  password: string;
  nickname: string;
}

export type { UserDTO, CreateUserParams };
