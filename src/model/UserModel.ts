import { RowDataPacket } from "mysql2";

export interface IUserRepository {
  findUserByEmail(email: string): Promise<TUserRow | null>;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type TUserRow = IUser & RowDataPacket;

export type TUserLogin = Pick<IUser, "email" | "password">;
