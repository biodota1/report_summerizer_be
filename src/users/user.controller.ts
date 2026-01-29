import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { ForbiddenError } from "../errors/ForbiddenError";

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface DeleteUserParams {
  id: string; // URL param is always string
}

const userService = new UserService();

export default {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const newUser = await userService.createUser({ name, email, password });
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  },

  async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getAllUser();
      res.status(200).json(result.rows);
    } catch (err: any) {
      next(err);
    }
  },

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const result = await userService.getUser({ id });
      res.status(200).json(result);
    } catch (err: any) {
      next(err);
    }
  },
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name, email, role, password } = req.body;
      const userData: Partial<UserData> = {};
      if (name) userData.name = name;
      if (email) userData.email = email;
      if (role) userData.role = role;
      if (password) userData.password = password;
      await userService.updateUser({ id }, userData);
    } catch (err: any) {
      next(err);
    }
  },

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await userService.deleteUser({ id });
      res.status(200).json({ msg: "User deleted" });
    } catch (err: any) {
      next(err);
    }
  },

  async deleteAll(_req: Request, res: Response, next: NextFunction) {
    try {
      await userService.deleteAll();
      res.status(200).json({ message: "Deleting All Successfully" });
    } catch (err: any) {
      next(err);
    }
  },
  async changeRole(req: Request, res: Response, next: NextFunction) {
    const { id, newRole } = req.body;
    try {
      const result = await userService.changeUserRole({ id, newRole });
      res.status(200).json({
        message: "User role updated successfully",
        data: { id: result.id, role: result.role },
      });
    } catch (err: any) {
      next(err);
    }
  },
  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user || !req.user.id)
        throw new ForbiddenError("Missing user id.");
      const userId = req.user.id;
      console.log(userId);
      const user = await userService.getUser({ id: userId });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.status(200).json({ user });
    } catch (err: any) {
      next(err);
    }
  },
};
