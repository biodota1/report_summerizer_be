import { AppError } from "../errors/AppError";

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}

// Database connection failed

// Unexpected exceptions
