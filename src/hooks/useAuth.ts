import { AuthData } from "@/validations/auth.scheme";
import { useRouter } from "next/navigation";
import { useState } from "react";

function useAuth() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRouter();

  async function handleLogin(data: AuthData) {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      route.push("/admin/addProjects");
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  }

  return {
    error,
    loading,
    handleLogin,
  };
}

export default useAuth;
