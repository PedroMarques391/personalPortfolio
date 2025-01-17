"use client";
import { usePathname, useRouter } from "next/navigation";
import { NavItems } from "../Menu/NavItems";
import { Button } from "../UI/Button";
import { handleScroll } from "@/utils/functions/handleScroll";

interface ISocialItemsInterface {
    text: string;
    href: string;
    duration: number

}
interface INavItemsInterface {
    text: string;
    href: string;
    duration: number
}

const Footer = (): React.JSX.Element => {
    const pathName: string = usePathname();
    const router = useRouter();


    const socialItems: ISocialItemsInterface[] = [
        { text: "LinkedIn", href: "https://www.linkedin.com/in/pedromarques391/", duration: 0.5 },
        { text: "GitHub", href: "https://github.com/PedroMarques391", duration: 1.0 },
        { text: "Instagram", href: "https://www.instagram.com/pedromarques.py/", duration: 1.5 },
        { text: "X", href: "https://x.com/PedroMarques391", duration: 2.0 },
    ];

    const navLinkItems: INavItemsInterface[] = [
        { text: "Home", href: "/", duration: 0.5 },
        { text: "Projetos", href: "/projects", duration: 1.0 },
        { text: "Sobre mim", href: "/about", duration: 1.5 },
        { text: "Contato", href: "/contact", duration: 2.0 },
    ];

    function handleClick(href: string) {
        if (href === pathName) {
            handleScroll(0);
        }
        if (href !== pathName) {
            router.push(href, { scroll: true });
        }
    }

    return (
        <footer className="bg-gray-light w-full py-10">
            <section className="grid grid-col-1 md:grid-cols-2 w-[90%] lg:w-[80%] mx-auto gap-2">
                <div className="flex gap-5 flex-col text-white w-full ">
                    <h1 className="text-gray-dark font-mono text-2xl text-center md:text-left md:text-3xl tracking-wider ">Pedro Marques</h1>
                    <p className="text-gray-soft text-mono text-xl text-justify md:text-left lg:text-justify shrink-0 hyphens-none lg:w-[80%] ">Desenvolvedor apaixonado por transformar ideias em experiências digitais interativas, responsivas e cativantes. Sempre em busca de inovação e soluções que unam criatividade e funcionalidade.</p>
                </div>
                <div className="flex flex-col gap-5 text-white w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2  mt-10 md:mt-0">
                        <nav className="w-full flex flex-col justify-start items-center ">
                            <h2 className="text-2xl md:text-xl lg:text-2xl font-mono tracking-wider font-semibold text-gray-dark mb-3 ">Navegação</h2>
                            <ul className="space-y-2 flex flex-col">
                                {navLinkItems.map((navItem, index) => (
                                    <NavItems.Footer
                                        onClick={() => handleClick(navItem.href)}
                                        key={index}
                                        duration={navItem.duration}
                                        href={navItem.href}>{navItem.text}
                                    </NavItems.Footer>
                                ))}
                            </ul>
                        </nav>
                        <hr className="p-3 mt-2 md:hidden" />
                        <nav className="w-full flex flex-col justify-start items-center">
                            <h2 className="text-2xl md:text-xl lg:text-2xl font-mono tracking-wider font-semibold text-gray-dark mb-3">Redes Sociais</h2>
                            <ul className="space-y-2">
                                {socialItems.map((socialItem, i) => (
                                    <Button.Footer duration={socialItem.duration} key={i} href={socialItem.href}>
                                        {socialItem.text}
                                    </Button.Footer>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

            </section>
        </footer>
    );
};


export default Footer;