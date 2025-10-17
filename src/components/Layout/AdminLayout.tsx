import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

interface IAdminLayoutProps {
  children: React.ReactNode;
}
const AdminLayout = ({ children }: IAdminLayoutProps): React.JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  async function handleLogout() {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    const data = await response.json();
    if (data.success) {
      return router.push("/");
    }
  }

  return (
    <section className="md:max-w-7xl mx-auto w-full">
      <ul className=" rounded-2xl w-fit mx-auto mb-5 border-2 border-orange-500">
        <li className="gap-x-4 text-gray-dark font-medium flex flex-row p-3 justify-center items-center">
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
          <button onClick={handleLogout} title="sair" className="w-fit p-2">
            <LuLogOut color="#fff" size={20} />
          </button>
        </li>
      </ul>
      {children}
    </section>
  );
};

export default AdminLayout;
