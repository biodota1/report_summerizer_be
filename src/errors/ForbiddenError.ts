import { AppError } from "../errors/AppError";

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}
// User tries to delete another user’s data

// Accessing admin-only endpoints
