"use client";

import { Input } from "@/components/UI/Input";
import SectionHeader from "@/components/UI/SectionHeader";
import imageToBase64 from "@/utils/functions/imageToBase64";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const projectScheme = z.object({
  title: z.string().min(1, "O nome é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  type: z.enum(["web", "mobile", "automações"], {
    errorMap: () => ({
      message: "Permitido apenas (web, mobile, automações)",
    }),
  }),
  tags: z
    .string()
    .min(1, "A tag é obrigatória e deve ser separada por vírgula."),
  url: z
    .string()
    .min(1, "A url é obrigatória do projeto é obrigatória.")
    .url("Insira uma url valida."),
});

type ProjectData = z.infer<typeof projectScheme>;

const Page = (): React.JSX.Element => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectData>({
    resolver: zodResolver(projectScheme),
  });

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  async function handleNewProject(data: ProjectData) {
    if (!image) {
      return alert("Por favor, selecione uma imagem");
    }
    const base64 = await imageToBase64(image);

    console.log(base64);

    await fetch("/api/project/add-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, imageURL: base64 }),
    });

    try {
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="max-w-5xl mx-auto w-full">
      <SectionHeader
        title="Novo Projeto"
        subtitle="Adicionar um"
        id="newProject"
      />

      <form
        onSubmit={handleSubmit(handleNewProject)}
        className="flex flex-col mt-5 max-w-xl mx-auto items-center"
      >
        <section className="w-72 h-64 mx-auto my-5 flex flex-col items-center justify-center bg-slate-200 rounded-lg border-2 border-dashed border-gray-400 overflow-hidden relative">
          {preview ? (
            <Image
              width={500}
              height={500}
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <svg
                className="w-12 h-12 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 4h4m0 0l-4 4m4-4l-4-4"
                ></path>
              </svg>
              <span>Selecionar imagem</span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="absolute w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </section>

        <Input
          duration={1.0}
          {...register("title")}
          error={errors.title?.message}
          label="Titulo"
        />
        <Input
          duration={1.0}
          {...register("description")}
          error={errors.description?.message}
          label="Descricao do projeto"
        />
        <Input
          duration={1.0}
          {...register("type")}
          error={errors.type?.message}
          label="Tipo"
        />
        <Input
          duration={1.0}
          {...register("tags")}
          error={errors.tags?.message}
          label="Tags"
        />
        <Input
          duration={1.0}
          {...register("url")}
          error={errors.url?.message}
          label="Url"
        />

        <button
          className="p-3 bg-red-700 text-white rounded hover:bg-red-600 transition my-5"
          type="submit"
        >
          Adicionar
        </button>
      </form>
    </section>
  );
};

export default Page;
