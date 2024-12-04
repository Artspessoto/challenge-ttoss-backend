import { FastifyRequest, FastifyReply } from "fastify";
import UserService from "../services/UserService";
import { userSchema } from "../validations/schemas/userSchema";
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

    return reply.status(201).send({ message: "User created 😎👍" });
  }
}

export default UserController;
