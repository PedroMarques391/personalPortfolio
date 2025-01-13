"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DetailedHTMLProps, LiHTMLAttributes } from "react"

interface INavItemsProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  href: string
}

const NavItems = ({ children, href, ...props }: INavItemsProps): React.JSX.Element => {
  const pathName: string = usePathname()
  const isCurrentPath: boolean = pathName === href
  console.log(pathName)

  return (
    <Link
      prefetch={true}
      replace
      href={href}>
      <li
        {...props}
        className={`text-center p-5 w-32 md:w-[120px] lg:w-32 relative group text-base md:text-sm lg:text-base `}>
        {children}
        <p className={`absolute bottom-0 left-0 group-hover:w-full group-hover:bg-orange-500/70 h-1 bg-orange-500 transition-all duration-300 ${isCurrentPath ? 'w-full group-hover:bg-orange-500' : 'w-0'}`} />
      </li>
    </Link>
  )
}

export default NavItems