import z from "zod";

const createProjectScheme = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(1, t("titleRequired")),
    content: z.string().min(1, t("contentRequired")),
    type: z.enum(["web", "mobile", "automações", "api"], {
      errorMap: () => ({
        message: t("typeInvalid"),
      }),
    }),
    tags: z
      .string()
      .min(1, t("tagsRequired")),
    url: z
      .string()
      .min(1, t("urlRequired"))
      .url(t("urlInvalid")),
  });

type ProjectData = z.infer<ReturnType<typeof createProjectScheme>>;

export { createProjectScheme, type ProjectData };
