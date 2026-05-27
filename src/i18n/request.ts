import { GetRequestConfigParams } from "next-intl/server";
import { cookies } from "next/headers";

export default async function getRequestConfig({}: GetRequestConfigParams) {
  const store = await cookies();
  const locale = store.get("locale")?.value || "pt";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
}
