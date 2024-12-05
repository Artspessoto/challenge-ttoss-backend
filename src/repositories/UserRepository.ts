import prisma from "../database/prismaClient";
import { User } from "../validations/schemas/userSchema";

class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUser(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async create(data: User) {
    const user = prisma.user.create({ data });
    return user;
  }

  async update(data: User, userId: string) {
    const user = prisma.user.update({
      where: { id: userId },
      data,
    });
    return user;
  }

  async list(){
    const users = prisma.user.findMany();
    return users;
  }
}

export default UserRepository;
