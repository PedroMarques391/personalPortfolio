import MySQL from "@/database/connection";
import Encrypt from "../shared/encrypt";

class UserRepository {
  async login(email: string, password: string): Promise<any> {
    const user = await this.findUserByEmail(email);

    const isValidPassword = await Encrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Usuário ou senha incorretos");
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows]: any[] = await MySQL.execute(query, [email]);

    if (!rows || rows.length === 0) {
      throw new Error("Credenciais inválidas");
    }

    return rows[0];
  }
}

const userRepository = new UserRepository();
export default userRepository;
