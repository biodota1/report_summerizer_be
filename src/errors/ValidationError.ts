import { AppError } from "../errors/AppError";

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
// Missing email or password on login

// Invalid email format

// Password too short
