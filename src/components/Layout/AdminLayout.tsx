"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface IAdminLayoutProps {
  children: React.ReactNode;
}
const AdminLayout = ({ children }: IAdminLayoutProps): React.JSX.Element => {
  const pathname = usePathname();
  return (
    <section className="md:max-w-7xl mx-auto w-full">
      <ul className="p-3 rounded-2xl w-fit mx-auto mb-3 border-2 border-orange-500">
        <li className="space-x-4 text-gray-dark font-medium">
          <Link
            href="/admin/addProjects"
            className={
              pathname === "/admin/addProjects" ? "text-orange-500" : ""
            }
          >
            Novo Projeto
          </Link>
          <Link
            href="/admin/myProjects"
            className={
              pathname === "/admin/myProjects" ? "text-orange-500" : ""
            }
          >
            Meus Projetos
          </Link>
        </li>
      </ul>
      {children}
    </section>
  );
};

export default AdminLayout;
