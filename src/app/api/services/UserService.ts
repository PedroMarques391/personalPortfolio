import { IUser, IUserRepository, TUserLogin } from "@/model/UserModel";
import Encrypt from "@/utils/encrypt";

class UserService {
  constructor(private readonly userResopitory: IUserRepository) {}

  async login(data: TUserLogin): Promise<IUser> {
    const user = await this.userResopitory.findUserByEmail(data.email);

    if (!user) {
      throw new Error("Usuário ou senha incorretos");
    }

    const isValidPassword = Encrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new Error("Usuário ou senha incorretos");
    }

    return user;
  }
}

export default UserService;
