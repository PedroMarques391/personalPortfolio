"use client";

import Handler from "@/utils/handler";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { NavItems } from "../Menu/NavItems";
import { Button } from "../ui/Button";

interface ISocialItemsInterface {
  text: string;
  href: string;
  duration: number;
}
interface INavItemsInterface {
  textKey: string;
  href: string | { pathname: string; query: { page: number } };
  duration: number;
}

const Footer = (): React.JSX.Element => {
  const pathName: string = usePathname();
  const router = useRouter();
  const t = useTranslations("components.footer");
  const navT = useTranslations("components.navbar");
  const { locale } = useParams();

  const socialItems: ISocialItemsInterface[] = [
    {
      text: "LinkedIn",
      href: "https://www.linkedin.com/in/pedromarques391/",
      duration: 0.5,
    },
    {
      text: "GitHub",
      href: "https://github.com/PedroMarques391",
      duration: 1.0,
    },
    {
      text: "Instagram",
      href: "https://www.instagram.com/pedromarques.dev/",
      duration: 1.5,
    },
    { text: "X", href: "https://x.com/opeedrodev", duration: 2.0 },
  ];

  const navLinkItems: INavItemsInterface[] = [
    { textKey: "homeLink", href: `/${locale}/`, duration: 0.5 },
    {
      textKey: "projectsLink",
      href: { pathname: `/${locale}/projects`, query: { page: 1 } },
      duration: 1.0,
    },
    { textKey: "aboutLink", href: `/${locale}/about`, duration: 1.5 },
    { textKey: "contactLink", href: `/${locale}/contact`, duration: 2.0 },
  ];

  function handleClick(
    href: string | { pathname: string; query: { page: number } },
  ) {
    const url = typeof href === "string" ? href : href.pathname;

    if (url === pathName) {
      Handler.scroll(0);
    }
    if (href !== pathName) {
      router.push(url, { scroll: true });
    }
  }

  return (
    <footer className="bg-gray-light w-full py-10 stycky bottom-0 ">
      <section className="grid grid-col-1 md:grid-cols-2 w-[90%] lg:w-[80%] mx-auto gap-2">
        <div className="flex gap-5 flex-col text-white w-full ">
          <h1 className="text-gray-dark font-mono text-2xl text-center md:text-left md:text-3xl tracking-wider ">
            Pedro Marques
          </h1>
          <p className="text-gray-soft text-mono text-xl text-justify md:text-left lg:text-justify shrink-0 hyphens-none lg:w-[80%] ">
            {t("description")}
          </p>
        </div>
        <hr className=" mt-2 md:hidden" />
        <div className="flex flex-col gap-5 text-white w-full">
          <div className="grid grid-cols-2 mt-10 md:mt-0 mx-auto  gap-10">
            <nav className="w-full flex flex-col justify-start items-center">
              <h1 className="text-[16px] md:text-xl lg:text-2xl font-mono tracking-wider font-semibold text-gray-dark mb-3">
                {t("navigationTitle")}
              </h1>
              <ul className="space-y-2 flex flex-col">
                {navLinkItems.map((navItem, index) => (
                  <NavItems
                    key={index}
                    onClick={() => handleClick(navItem.href)}
                    href={navItem.href}
                  >
                    {navT(navItem.textKey as any)}
                  </NavItems>
                ))}
              </ul>
            </nav>

            <nav className="w-full flex flex-col justify-start items-center">
              <h1 className="text-[16px] md:text-xl lg:text-2xl font-mono tracking-wider font-semibold text-gray-dark mb-3">
                {t("socialTitle")}
              </h1>
              <div className="space-y-2 md:space-y-5">
                {socialItems.map((socialItem, index) => (
                  <Button.Footer
                    key={index}
                    duration={socialItem.duration}
                    href={socialItem.href}
                  >
                    {socialItem.text}
                  </Button.Footer>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
