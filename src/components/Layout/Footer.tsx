"use client";
import { handleScroll } from "@/utils/functions/handleScroll";
import { usePathname, useRouter } from "next/navigation";
import { NavItems } from "../Menu/NavItems";
import { Button } from "../UI/Button";

interface ISocialItemsInterface {
  text: string;
  href: string;
  duration: number;
}
interface INavItemsInterface {
  text: string;
  href: string | { pathname: string; query: { page: number } };
  duration: number;
}

const Footer = (): React.JSX.Element => {
  const pathName: string = usePathname();
  const router = useRouter();

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
    { text: "Home", href: "/", duration: 0.5 },
    {
      text: "Projetos",
      href: { pathname: "/projects", query: { page: 1 } },
      duration: 1.0,
    },
    { text: "Sobre mim", href: "/about", duration: 1.5 },
    { text: "Contato", href: "/contact", duration: 2.0 },
  ];

  function handleClick(
    href: string | { pathname: string; query: { page: number } }
  ) {
    const url = typeof href === "string" ? href : href.pathname;

    if (url === pathName) {
      handleScroll(0);
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
            Desenvolvedor apaixonado por transformar ideias em experiências
            digitais interativas, responsivas e cativantes. Sempre em busca de
            inovação e soluções que unam criatividade e funcionalidade.
          </p>
        </div>
        <hr className=" mt-2 md:hidden" />
        <div className="flex flex-col gap-5 text-white w-full">
          <div className="grid grid-cols-2 mt-10 md:mt-0 mx-auto  gap-10">
            <nav className="w-full flex flex-col justify-start items-center">
              <h2 className="text-xl md:text-xl lg:text-2xl font-mono tracking-wider font-semibold text-gray-dark mb-3">
                Navegação
              </h2>
              <ul className="space-y-2 flex flex-col">
                {navLinkItems.map((navItem, index) => (
                  <NavItems
                    key={index}
                    onClick={() => handleClick(navItem.href)}
                    href={navItem.href}
                  >
                    {navItem.text}
                  </NavItems>
                ))}
              </ul>
            </nav>

            <nav className="w-full flex flex-col justify-start items-center">
              <h2 className="text-xl md:text-xl lg:text-2xl font-mono tracking-wider font-semibold text-gray-dark mb-3">
                Redes Sociais
              </h2>
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
