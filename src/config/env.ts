import { ConfigurationError } from "../errors/ConfigurationError";

export default function getEnv(key: string): string {
  const value = process.env[key];
  if (!value)
    throw new ConfigurationError(`Missing environment variable: ${key}`);
  return value.trim();
}
