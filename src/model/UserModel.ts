import { RowDataPacket } from "mysql2";

export interface IUserRepository {
  login(data: Pick<IUser, "email" | "password">): Promise<IUser>;
  findUserByEmail(email: string): Promise<any>;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type TUserRow = IUser & RowDataPacket;

export type TUserLogin = Pick<IUser, "email" | "password">;
