import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, "O campo não pode ficar vazio.")
    .email("Insira um email válido"),
  password: z.string().min(1, "Qual é a sua senha?"),
});

type FormData = z.infer<typeof schema>;

function useAuth() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  async function handleLogin(data: FormData) {
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

      reset();
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

  const onSubmit = handleSubmit(handleLogin);

  return {
    error,
    loading,
    register,
    onSubmit,
    errors,
  };
}

export default useAuth;
