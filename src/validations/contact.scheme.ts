import z from "zod";

const contactScheme = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("Digite um email válido."),
  phone: z
    .string()
    .min(1, "O telefone é obrigatório")
    .refine((value) => /^[\d\(\)\-\s]{14,15}$/.test(value), {
      message: "Numero de telefone invalido",
    }),
  message: z.string().min(1, "A mensagem é obrigatória."),
});

type ContactData = z.infer<typeof contactScheme>;

export { contactScheme, type ContactData };
