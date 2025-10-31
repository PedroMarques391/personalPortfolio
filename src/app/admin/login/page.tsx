"use client";
import { Input } from "@/components/UI/Input";
import useAuth from "@/hooks/useAuth";
import { AuthData, authScheme } from "@/validations/auth.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Page = (): React.JSX.Element => {
  const { loading, error, handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>({
    resolver: zodResolver(authScheme),
  });

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
