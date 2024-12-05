import { FastifyRequest, FastifyReply } from "fastify";
import UserService from "../services/UserService";
import {
  updateUserSchema,
  userSchema,
} from "../validations/schemas/userSchema";
import { AppError } from "../utils/AppError";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const { success, error, data } = userSchema.safeParse(req.body);

    if (!success) {
      throw new AppError(error.errors.map((err) => err.message).join(", "));
    }

    const { name, email, password } = data;

    await this.userService.createUser({ name, email, password });

    return reply.status(201).send({ message: "Usuário criado 😎👍" });
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { success, error, data } = updateUserSchema.safeParse(req.body);
    const { id } = req.user as { id: string; email: string };

    if (!success) {
      throw new AppError(error.errors.map((err) => err.message).join(", "));
    }

    const { name, email, old_password, password } = data;

    const updatedUser = await this.userService.updateUser(
      { name, email, old_password, password },
      id
    );

    return reply.status(200).send({ User: updatedUser });
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const listUsers = await this.userService.listAll();
    return reply.status(200).send({ list: listUsers });
  }
}

export default UserController;
