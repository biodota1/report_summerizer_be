import { AppError } from "../errors/AppError";

export class AuthError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

// Wrong email or password

// Invalid token

// Trying to access protected resource without login
