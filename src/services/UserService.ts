import { hash } from "bcrypt";
import UserRepository from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";
import { User, userSchema } from "../validations/schemas/userSchema";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(data: User): Promise<User> {
    const { success, error } = userSchema.safeParse(data);

    if (!success) {
      throw new AppError(
        error.errors.map((err) => err.message).join(", "),
        400
      );
    }

    const emailExists = await this.userRepository.findByEmail(data.email);

    if (emailExists) {
      throw new AppError("Este e-mail já está em uso");
    }

    const hashedPassword = await hash(data.password, 8);

    const { name, email } = data;

    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}

export default UserService;
