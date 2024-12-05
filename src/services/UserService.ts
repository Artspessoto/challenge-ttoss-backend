import { compare, hash } from "bcrypt";
import UserRepository from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";
import {
  UpdateUser,
  updateUserSchema,
  User,
  userSchema,
} from "../validations/schemas/userSchema";

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

  public async updateUser(data: UpdateUser, userId: string) {
    const { success, error } = updateUserSchema.safeParse(data);

    if (!success) {
      throw new AppError(error.errors.map((err) => err.message).join(", "));
    }

    const user = await this.userRepository.findByUser(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const userWithUpdateEmail = await this.userRepository.findByEmail(
      data.email
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== userId) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;

    if (data.password && data.old_password) {
      const checkOldPassword = await compare(data.old_password, user.password);
      if (!checkOldPassword) throw new AppError("A senha antiga não confere.");

      user.password = await hash(data.password, 8);
    }

    const updatedData: User = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const updateUser: User = await this.userRepository.update(
      updatedData,
      userId
    );

    return updateUser;
  }
}

export default UserService;
