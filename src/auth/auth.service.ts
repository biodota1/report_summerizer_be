import { AuthError } from "../errors/AuthError";
import { ValidationError } from "../errors/ValidationError";
import { UserRepository } from "../users/user.repo";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { ConflictError } from "../errors/ConflictError";
import { LoginInput, Payload, RegisterInput } from "./auth.types";

export class AuthService {
  constructor(private userRepo: UserRepository = new UserRepository()) {}
  async login(data: LoginInput) {
    const { email, password } = data;
    if (!email || !password)
      throw new ValidationError("Email and password required");
    const user = await this.userRepo.findByEmail(email);

    if (!user) throw new AuthError("Invalid email or password");

    const { id, role } = user;

    const payload: Payload = { id, role };

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new AuthError("Invalid email or password");

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    const { password: _, ...safeUser } = user;
    return { accessToken, refreshToken, user: safeUser };
  }
  async register(data: RegisterInput) {
    const { name, email, password } = data;

    if (!name) throw new ValidationError("Name is required");
    if (!email) throw new ValidationError("Email is required");
    if (!password) throw new ValidationError("Password is required");

    const checkDuplicateEmail = await this.userRepo.findByEmail(email);

    if (checkDuplicateEmail)
      throw new ConflictError("Email is already registered");

    if (password.length < 8)
      throw new ValidationError("Password must be at least 8 characters long");

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.userRepo.createUser({
      ...data,
      password: hashedPassword,
    });

    const { password: _, ...safeUser } = result;
    return safeUser;
  }
}
