import * as jose from "jose";
import { NextRequest } from "next/server";

export class AuthTokenService {
  static async generateToken(payload: { id: string; email: string }) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    return await new jose.SignJWT({
      id: payload.id,
      email: payload.email,
    })
      .setExpirationTime("7d")
      .setIssuedAt()
      .setProtectedHeader({ alg })
      .sign(secret);
  }

  static async verifyToken(req: NextRequest): Promise<jose.JWTPayload> {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = req.cookies.get("token")?.value;
    if (!token) throw new Error("Não autenticado");

    try {
      const { payload } = await jose.jwtVerify(token, secret);
      return payload;
    } catch {
      throw new Error("Token inválido ou expirado");
    }
  }
}
