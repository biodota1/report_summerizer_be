import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { UserRepository } from "./user.repo";
interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export class UserService {
  constructor(private userRepo = new UserRepository()) {}

  async createUser(data: { name: string; email: string; password: string }) {}
  async getAllUser() {
    const result = await this.userRepo.getAllUser();
    return result;
  }
  async deleteUser(data: { id: string }) {
    const user = await this.userRepo.findById(data.id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.role === "admin") {
      const adminCount = await this.userRepo.countAdmins();
      if (adminCount <= 1) {
        throw new ConflictError("Cannot delete the last admin");
      }
    }
    const result = await this.userRepo.deleteById(data.id);
    return result;
  }
  async updateUser(data: { id: string }, userData: Partial<UserData>) {
    const result = await this.userRepo.updateById(data, userData);
    return result;
  }
  async getUser(data: { id: string }) {
    const result = await this.userRepo.getById(data.id);
    return result;
  }
  async deleteAll() {
    await this.userRepo.deleteAll();
  }
  async changeUserRole(data: { id: string; newRole: string }) {
    const user = await this.userRepo.changeRoleById(data);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}
