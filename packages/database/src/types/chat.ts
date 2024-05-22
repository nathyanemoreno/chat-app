interface CreateChat {
  creatorId: string;
}

interface UpdateChat {
  id: string;
}

interface CreateEnrollmentChat {
  userId: string;
  chatId: string;
}

interface UpdateEnrollmentChat {

}

export type { UpdateChat, CreateChat, CreateEnrollmentChat };
