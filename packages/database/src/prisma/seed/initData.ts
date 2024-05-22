import { PrismaClient } from "@prisma/client";
import { ENV_VARIABLES } from "../../config/env";
import { hashPassword } from "../../utils/hash";

const prisma = new PrismaClient();

async function main() {
  await prisma.groupEnrollment.deleteMany({});

  await prisma.user.deleteMany({});

  await prisma.group.deleteMany({});

  const adminPassword = await hashPassword(
    ENV_VARIABLES.DEFAULT_ADMIN_PASSWORD,
  );
  const testerPassword = await hashPassword(
    ENV_VARIABLES.TESTER_DEFAULT_PASSWORD,
  );

  const admin = await prisma.user.upsert({
    where: { email: "admin@nappla.com" },
    update: {},
    create: {
      email: "admin@nappla.com",
      password: adminPassword,
      name: "admin",
      nickname: "Administrator",
    },
  });

  const allUsers = await prisma.group.create({
    data: {
      name: "AllUsers",
      creatorId: "1",
      members: {
        create: {
          role: "MEMBER",
          user: {
            connect: {
              email: "admin@nappla.com",
            },
          },
        },
      },
    },
    include: {
      members: true,
    },
  });

  const tester = await prisma.user.upsert({
    where: { email: "tester@nappla.com" },
    update: {},
    create: {
      email: "tester@nappla.com",
      password: testerPassword,
      name: "tester",
      nickname: "Tester",
      groups: {
        create: {
          role: "MEMBER",
          group: {
            connect: {
              id: allUsers.id,
            },
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
