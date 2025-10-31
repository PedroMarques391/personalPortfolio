import z from "zod";

const authScheme = z.object({
  email: z
    .string()
    .min(1, "O campo não pode ficar vazio.")
    .email("Insira um email válido"),
  password: z.string().min(1, "Qual é a sua senha?"),
});

type AuthData = z.infer<typeof authScheme>;

export { authScheme, type AuthData };
