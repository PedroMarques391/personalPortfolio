"use client";
import { Input } from "@/components/UI/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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

const Page = (): React.JSX.Element => {
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
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      route.push("/admin/addProjects");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      reset();
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

  return (
    <section className="w-full h-auto max-w-xl bg-gray-light  rounded-2xl  p-8 mx-auto my-20 text-gray-soft">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Painel de Acesso
      </h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col mx-auto justify-center items-center"
      >
        <Input
          duration={0.5}
          {...register("email")}
          error={errors.email?.message}
          label="Email"
        />

        <Input
          duration={0.5}
          {...register("password")}
          error={errors.password?.message}
          label="Senha"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          disabled={loading}
          type="submit"
          className="mt-3 bg-orange-500 hover:bg-orange-600 text-black font-medium rounded-xl transition p-2 w-full md:w-[70%] tracking-widest disabled:bg-orange-500/80 disabled:cursor-not-allowed"
        >
          {loading ? "Acessando..." : "Acessar"}
        </button>
      </form>
    </section>
  );
};

export default Page;
