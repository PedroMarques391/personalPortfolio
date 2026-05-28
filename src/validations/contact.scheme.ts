import z from "zod";

const createContactScheme = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t("nameRequired")),
    email: z.string().email(t("emailInvalid")),
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .refine((value) => /^[\d\(\)\-\s]{14,15}$/.test(value), {
        message: t("phoneInvalid"),
      }),
    message: z.string().min(1, t("messageRequired")),
  });

type ContactData = z.infer<ReturnType<typeof createContactScheme>>;

export { createContactScheme, type ContactData };
