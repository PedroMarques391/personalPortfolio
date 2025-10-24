import MySQL from "@/database/connection";
import Encrypt from "../shared/encrypt";

class UserRepository {
  async login(email: string, password: string): Promise<any> {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows]: any[] = await MySQL.execute(query, [email]);

    if (!rows || rows.length === 0) {
      throw new Error("Credenciais inválidas");
    }
    const user = rows[0];

    const isValidPassword = await Encrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Usuário ou senha incorretos");
    }

    return user;
  }
}

const userRepository = new UserRepository();
export default userRepository;
