import { hasLocale } from "next-intl";
import { GetRequestConfigParams } from "next-intl/server";
import { routing } from "./routing";

export default async function getRequestConfig({
  requestLocale,
}: GetRequestConfigParams) {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
}
