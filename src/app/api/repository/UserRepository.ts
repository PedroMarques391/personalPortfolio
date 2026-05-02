import MySQL from "@/database/connection";
import { IUserRepository, TUserRow } from "@/model/UserModel";

class UserRepository implements IUserRepository {
  async findUserByEmail(email: string): Promise<TUserRow | null> {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await MySQL.execute<TUserRow[]>(query, [email]);

    if (!rows || rows.length === 0) {
      throw new Error("Credenciais inválidas");
    }

    return rows[0];
  }
}

export default UserRepository;
