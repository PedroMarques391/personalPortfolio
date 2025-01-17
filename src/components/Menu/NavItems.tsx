"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DetailedHTMLProps, LiHTMLAttributes, useRef } from "react";
import { motion, useInView } from "motion/react";

interface INavItemsProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  href: string
}

interface INavItemsFooterProps {
  href: string
  children: React.ReactNode
  onClick: () => void
  duration: number
}

const NavItems = ({ children, href, ...props }: INavItemsProps): React.JSX.Element => {
  const pathName: string = usePathname();
  const isCurrentPath: boolean = pathName === href;

  return (
    <Link
      prefetch={true}
      replace
      href={href}>
      <li
        {...props}
        className={`text-center p-5 w-32 md:w-[120px] lg:w-32 relative group text-base md:text-sm lg:text-base px-2`}>
        {children}
        <p className={`absolute bottom-0 left-0 group-hover:w-full group-hover:bg-orange-500/70 h-1 bg-orange-500 transition-all duration-300 ${isCurrentPath ? 'w-full group-hover:bg-orange-500' : 'w-0'}`} />
      </li>
    </Link>
  );
};

const Footer = ({ children, href, onClick, duration }: INavItemsFooterProps) => {
  const pathName: string = usePathname();
  const isCurrentPath: boolean = pathName === href;

  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });

  const itemVariant = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <button onClick={onClick}>
      <motion.li
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={itemVariant}
        transition={{ duration: duration, }}
        className={`text-center p-5 w-32 md:w-[120px] lg:w-32 relative group text-base md:text-sm lg:text-base px-2`}
      >
        {children}
        <p
          className={`absolute bottom-0 left-0 group-hover:w-full group-hover:bg-orange-500/70 h-1 bg-orange-500 transition-all duration-300 ${isCurrentPath ? "w-full group-hover:bg-orange-500" : "w-0"
            }`}
        />
      </motion.li>
    </button>
  );
};

NavItems.Footer = Footer;

export { NavItems };