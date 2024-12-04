import prisma from "../database/prismaClient";
import { User } from "../validations/schemas/userSchema";

class SessionsRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}

export default SessionsRepository;
