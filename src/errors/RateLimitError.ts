import { AppError } from "../errors/AppError";

export class RateLimitError extends AppError {
  constructor(message: string) {
    super(message, 429);
  }
}
// Too Many Requests
