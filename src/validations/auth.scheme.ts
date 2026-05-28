import z from "zod";

const createAuthScheme = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t("fieldRequired"))
      .email(t("emailInvalid")),
    password: z.string().min(1, t("passwordRequired")),
  });

type AuthData = z.infer<ReturnType<typeof createAuthScheme>>;

export { createAuthScheme, type AuthData };
