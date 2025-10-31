import z from "zod";

const projectScheme = z.object({
  title: z.string().min(1, "O nome é obrigatório."),
  content: z.string().min(1, "A descrição é obrigatória."),
  type: z.enum(["web", "mobile", "automações"], {
    errorMap: () => ({
      message: "Permitido apenas (web, mobile, automações)",
    }),
  }),
  tags: z
    .string()
    .min(1, "A tag é obrigatória e deve ser separada por vírgula."),
  url: z
    .string()
    .min(1, "A url é obrigatória do projeto é obrigatória.")
    .url("Insira uma url valida."),
});

type ProjectData = z.infer<typeof projectScheme>;

export { projectScheme, type ProjectData };
