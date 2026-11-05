import useAuth from "@/hooks/useAuth";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LuFolderKanban, LuLogOut, LuPlus } from "react-icons/lu";

interface IAdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: IAdminLayoutProps): React.JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("admin.layout");

  const { logout } = useAuth();
  async function handleLogout() {
    const response = await logout();
    if (response.success) {
      router.push("/");
    }
  }

  const navItems = [
    {
      href: "/admin/addProjects",
      label: t("newProject"),
      icon: LuPlus,
      active: pathname.endsWith("/admin/addProjects"),
    },
    {
      href: "/admin/myProjects",
      label: t("myProjects"),
      icon: LuFolderKanban,
      active: pathname.endsWith("/admin/myProjects"),
    },
  ];

  return (
    <section className="md:max-w-7xl mx-auto w-full px-4 sm:px-6 pb-16">
      <nav
        aria-label="Admin"
        className="w-fit mx-auto mb-8 bg-gray-light border border-white/10 rounded-xl p-1.5 flex items-center gap-1 shadow-md"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                item.active
                  ? "text-white"
                  : "text-gray-dark hover:text-gray-soft"
              }`}
            >
              {item.active && (
                <motion.span
                  layoutId="admin-nav-indicator"
                  transition={{
                    type: "spring",
                    visualDuration: 0.25,
                    bounce: 0.15,
                  }}
                  className="absolute inset-0 rounded-lg bg-gray-800 border border-orange-500/50"
                />
              )}
              <Icon
                size={16}
                className={`relative z-10 ${item.active ? "text-orange-400" : ""}`}
              />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}

        <div className="h-5 w-px bg-white/10 mx-1" aria-hidden="true" />

        <button
          type="button"
          onClick={handleLogout}
          title={t("logoutTitle")}
          aria-label={t("logoutTitle")}
          className="px-3 py-2 rounded-lg text-gray-dark hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200 flex items-center gap-1.5 text-sm font-medium"
        >
          <LuLogOut size={16} />
          <span className="hidden sm:inline">{t("logoutTitle")}</span>
        </button>
      </nav>
      {children}
    </section>
  );
};

export default AdminLayout;

