import MySQL from "@/database/connection";
import {
  IUserRepository,
  TUserLogin,
  IUser,
  TUserRow,
} from "@/model/UserModel";
import Encrypt from "@/utils/encrypt";

class UserRepository implements IUserRepository {
  async login(data: TUserLogin): Promise<IUser> {
    const user = await this.findUserByEmail(data.email);

    if (!user) {
      throw new Error("Usuário ou senha incorretos");
    }

    const isValidPassword = Encrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new Error("Usuário ou senha incorretos");
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<TUserRow | null> {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await MySQL.execute<TUserRow[]>(query, [email]);
    console.log(rows);

    if (!rows || rows.length === 0) {
      throw new Error("Credenciais inválidas");
    }

    return rows[0];
  }
}

const userRepository = new UserRepository();
export default userRepository;
