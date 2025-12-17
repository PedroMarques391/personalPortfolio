"use client";
import { motion, useInView } from "motion/react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

interface INavItemsProps extends LinkProps {
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
  const hrefPathname = typeof href === "string" ? href : href?.pathname;
  const isCurrentPath: boolean = pathName === hrefPathname;

  return (
    <li
      className={`text-center w-32 md:w-[120px] lg:w-32 relative group text-base lg:text-lg px-2 `}
    >
      <Link
        {...props}
        href={href}
        className=" w-full h-full block py-4"
        prefetch={true}
        replace
      >
        {children}
        <p
          className={`absolute bottom-0 left-0 group-hover:w-full group-hover:bg-orange-500/70 h-1 bg-orange-500 transition-all duration-300 ${
            isCurrentPath ? "w-full group-hover:bg-orange-500" : "w-0"
          }`}
        />
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
