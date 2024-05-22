interface CreateUser {
  email: string;
  password: string;
  status?: string;
  name?: string;
  nickname?: string;
}

interface UpdateUser {
  id: string;
  password: string;
  name?: string;
  status?: string;
  nickname?: string;
}

export type { CreateUser, UpdateUser };
