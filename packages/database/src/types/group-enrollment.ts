import { GroupEnrollment, User, UserRole } from "@prisma/client";

interface CreateEnrollmentGroup {
  userId: string;
  groupId: string;
  role: UserRole;
}

type GroupUsers = ({
  user: User;
} & GroupEnrollment)[];

export type { CreateEnrollmentGroup, GroupUsers };
