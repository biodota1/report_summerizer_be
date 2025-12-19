import { AppError } from "../errors/AppError";

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

// Email already registered

// Username already taken
