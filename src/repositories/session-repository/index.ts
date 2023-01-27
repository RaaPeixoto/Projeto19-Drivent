import { prisma } from "@/config";
import { Prisma, Session } from "@prisma/client";

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}
async function findBytoken(token: string): Promise<Session> {
  return prisma.session.findFirst ({
    where: {
      token: token
    }
  });
}
const sessionRepository = {
  create,
  findBytoken
};

export default sessionRepository;
