import { AppError } from "../errors/AppError";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}
// User ID doesn’t exist

// Requested post/product doesn’t exist
