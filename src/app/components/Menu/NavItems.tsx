"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface INavItemsProps {
  children: React.ReactNode
  href: string
  styles?: string
}

const NavItems = ({ children, href, styles }: INavItemsProps): React.JSX.Element => {
  const pathName: string = usePathname()
  const isCurrentPath = pathName === href
  console.log(pathName)

  return (
    <Link
      replace
      href={href}>
      <li
        className={`text-center p-5 w-32 ${styles} relative group`}>
        {children}
        <p className={`absolute bottom-0 left-0 group-hover:w-full group-hover:bg-white/70 h-1 bg-white transition-all duration-300 ${isCurrentPath ? 'w-full group-hover:bg-white' : 'w-0'}`} />
      </li>
    </Link>
  )
}

export default NavItems