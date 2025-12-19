import { pool } from "../db/db";
import { ChangeUserRole, CreateUserData, User } from "./user.types";

export class UserRepository {
  async getAllUser() {
    const result = await pool.query(
      "SELECT id, name, email, created_at, role FROM users"
    );
    return result;
  }
  async createUser(data: CreateUserData) {
    const { name, email, password } = data;
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    return result.rows[0];
  }
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [email]
    );
    const user = result.rows[0];
    return user || null;
  }

  async getById(id: string) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return rows[0] || null;
  }
  async deleteById(id: string) {
    const { rows } = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return rows[0] || null;
  }
  async deleteAll() {
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  }
  async updateById(data: { id: string }, userData: Partial<User>) {
    const keys = Object.keys(userData);
    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const values = Object.values(userData);

    values.push(data.id);

    const query = `UPDATE users SET ${setClause} WHERE id = $${values.length} RETURNING *`;
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  }
  async changeRoleById(data: ChangeUserRole) {
    const { id, newRole } = data;
    const result = await pool.query(
      `UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role`,
      [newRole, id]
    );
    return result.rows[0];
  }
}
