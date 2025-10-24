"use client";

import { IMessageInterface } from "@/app/contact/page";
import AdminLayout from "@/components/Layout/AdminLayout";
import { Input } from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import SectionHeader from "@/components/UI/SectionHeader";
import imageToBase64 from "@/utils/functions/imageToBase64";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrashAlt } from "react-icons/bi";
import { FiLoader } from "react-icons/fi";
import z from "zod";

const projectScheme = z.object({
  title: z.string().min(1, "O nome é obrigatório."),
  content: z.string().min(1, "A descrição é obrigatória."),
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
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState({} as IMessageInterface);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
      setShowModal(true);
      setMessage({
        title: "Selecione uma Imagem",
        subtitle: "É nescessario selecionar uma imagem para o projeto.",
        content: "Tenta Novamente",
        success: false,
      });

      setTimeout(() => {
        setShowModal(false);
      }, 2000);
      return;
    }
    try {
      setLoading(true);
      const base64 = await imageToBase64(image);

      const res = await fetch("/api/project/add-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, imageURL: base64 }),
      });

      if (!res.ok) {
        throw new Error("Erro ao adicionar o projeto, tente novamente.");
      }

      setShowModal(true);
      setMessage({
        title: "Projeto Adicionado com Sucesso",
        subtitle: "Obrigado por adicionar um novo projeto.",
        content: "Obrigado por adicionar um novo projeto.",
        success: true,
      });
    } catch (error: any) {
      setShowModal(true);
      setMessage({
        title: "Algo deu errado",
        subtitle: error.message,
        content: "Tente Novamente",
        success: false,
      });
    } finally {
      setLoading(false);
      setPreview(null);
      setImage(null);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
      reset();
    }
  }

  return (
    <AdminLayout>
      <SectionHeader
        title="Novo Projeto"
        subtitle="Adicionar um"
        id="newProject"
      />

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title={message.title}
          subtitle={message.subtitle}
          success={message.success}
        >
          {message.content}
        </Modal>
      )}

      <form
        onSubmit={handleSubmit(handleNewProject)}
        className="flex flex-col mt-5 max-w-xl mx-auto items-center"
      >
        <section className="w-72 h-64 mx-auto my-5 flex flex-col items-center justify-center bg-slate-200 rounded-lg border-2 border-dashed border-orange-500 overflow-hidden relative">
          {preview ? (
            <>
              <Image
                width={500}
                height={500}
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                }}
                className="absolute top-2 right-2 bg-red-500/50 hover:bg-red-500/100 transition-colors duration-300 text-white p-2 rounded z-20"
              >
                <BiTrashAlt size={20} color="white" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-orange-500">
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
              <span>Arraste ou selecione uma imagem</span>
            </div>
          )}

          <input
            type="file"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setImage(e.dataTransfer.files[0]);
              }
            }}
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
          {...register("content")}
          error={errors.content?.message}
          label="Descrição"
        />
        <div className="relative w-[90%] sm:w-[90%]  md:w-[90%] lg:w-[70%] my-3">
          <select
            {...register("type")}
            id="select"
            required
            className={`peer text-white border-2 bg-transparent 
                    rounded-md w-full h-12 px-4 outline-none 
                    transition duration-300 focus:border-orange-500 
                    appearance-none ${
                      errors.type
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-soft"
                    }`}
          >
            <option
              className="bg-gray-light text-gray-dark text-center"
              value=""
              disabled
            >
              Selecionar
            </option>

            <option className="bg-gray-light text-gray-dark" value="web">
              Web
            </option>

            <option className="bg-gray-light text-gray-dark" value="mobile">
              Mobile
            </option>

            <option
              className="bg-gray-light text-gray-dark "
              value="automações"
            >
              Automações
            </option>
          </select>
          <label
            htmlFor={"select"}
            className={`
          absolute left-4 top-[50%] -translate-y-[50%] text-accent 
          bg-transparent pointer-events-none transition-all duration-300 
          peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-base 
          peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-accent 
          peer-focus:top-0 peer-focus:text-sm peer-focus:bg-black text-white px-2 
          peer-valid:top-0 peer-valid:bg-black peer-valid:text-sm`}
          >
            Tipo{" "}
          </label>
          {errors.type?.message && (
            <span className="text-red-500 text-sm">{errors.type.message}</span>
          )}
        </div>
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
          label="URL"
        />

        <button
          title="Prosseguir"
          disabled={loading}
          className="p-3  bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 my-5 w-52 text-center disabled:bg-orange-500/60 disabled:cursor-not-allowed rounded-xl"
          type="submit"
        >
          {loading ? (
            <FiLoader className="animate-spin text-black w-full text-center text-xl" />
          ) : (
            "Adicionar Projeto"
          )}
        </button>
      </form>
    </AdminLayout>
  );
};

export default Page;
