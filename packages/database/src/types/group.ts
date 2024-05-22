interface CreateGroup {
  creatorId: string;
  groupDetails: string;
  name: string;
}

interface UpdateGroup {
  id: string;
  name: string;
  groupDetails: string;
}

export type { CreateGroup, UpdateGroup };
