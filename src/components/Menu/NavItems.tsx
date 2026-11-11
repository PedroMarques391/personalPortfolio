import { Link, usePathname } from "@/i18n/navigation";
import { spring } from "@/utils/motion";
import { motion, useInView } from "motion/react";
import React, { ComponentProps, useRef } from "react";

type NavLinkProps = ComponentProps<typeof Link>;

interface INavItemsProps extends NavLinkProps {
  children: React.ReactNode;
}

interface INavItemsFooterProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  duration: number;
}

const NavItems = ({
  children,
  href,
  ...props
}: INavItemsProps): React.JSX.Element => {
  const pathName: string = usePathname();
  const hrefPathname = typeof href === "string" ? href : (href as any)?.pathname;
  const isCurrentPath: boolean =
    pathName === hrefPathname ||
    (hrefPathname === "/" && (pathName === "" || pathName === "/"));

  return (
    <li className="text-center w-32 md:w-[120px] lg:w-32 relative group text-base lg:text-lg px-2">
      <Link
        {...(props as any)}
        href={href}
        aria-current={isCurrentPath ? "page" : undefined}
        className={`w-full h-full block py-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-md ${
          isCurrentPath ? "text-white font-medium" : "text-gray-soft hover:text-white"
        }`}
        prefetch={true}
      >
        {children}
        {isCurrentPath ? (
          <motion.span
            layoutId="navbar-active-indicator"
            transition={spring.snappy}
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-orange-500/60 transition-all duration-300 rounded-full"
          />
        )}
      </Link>
    </li>
  );
};

const Footer = ({
  children,
  href,
  onClick,
  duration,
}: INavItemsFooterProps) => {
  const pathName: string = usePathname();
  const isCurrentPath: boolean = pathName === href;

  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });

  const itemVariant = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariant}
      transition={{ duration: duration }}
      className={`text-center w-32 md:w-[120px] lg:w-36 relative group text-base md:text-xl lg:text-lg lg:px-2 `}
    >
      <button
        onClick={onClick}
        aria-label={`Navegação para ${children}`}
        className=" block p-2 lg:p-3 w-full"
      >
        {children}
        <p
          className={`absolute bottom-0 left-0 group-hover:w-full group-hover:bg-orange-500/70 h-[2px] md:h-1 bg-orange-500 transition-all duration-300 ${
            isCurrentPath ? "w-full group-hover:bg-orange-500" : "w-0"
          }`}
        />
      </button>
    </motion.li>
  );
};

NavItems.Footer = Footer;

export { NavItems };
