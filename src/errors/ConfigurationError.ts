import { AppError } from "./AppError";

export class ConfigurationError extends AppError {
  constructor(message: string) {
    super(message, 500); // Internal Server Error
    this.name = "ConfigurationError";
  }
}
