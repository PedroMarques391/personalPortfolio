import bycript from "bcrypt";

export default class Encrypt {
  static encrypt(password: string): string {
    const emcryptedPassword = bycript.hashSync(password, 10);
    return emcryptedPassword;
  }

  static compare(password: string, emcryptedPassword: string): boolean {
    return bycript.compareSync(password, emcryptedPassword);
  }
}
