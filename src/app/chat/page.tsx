"use client";

import Image from "next/image";
import { useRef } from "react";
import { BsSendArrowUp } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { IoReloadOutline } from "react-icons/io5";

import Ada from "../../../public/assets/ada.jpg";

const Page = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center text-white bg-black">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-orange-500 rounded-lg text-black font-medium hover:bg-orange-400 transition-colors"
      >
        Abrir Chat
      </button>

      <dialog
        ref={modalRef}
        className="bg-[#111111] w-[24rem] h-[32rem] rounded-2xl text-white backdrop:bg-black/90 p-0 outline-none shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-white/5 overflow-hidden"
      >
        <div className="w-full h-full flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={Ada}
                  alt="Avatar da Ada"
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-10 h-10"
                  priority
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#111111]" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-soft tracking-wide">
                  Ada
                </h1>
                <p className="text-[11px] text-gray-dark">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Recarregar"
              >
                <IoReloadOutline size={16} className="text-gray-dark" />
              </button>
              <button
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                onClick={closeModal}
                aria-label="Fechar"
              >
                <CgClose size={16} className="text-gray-dark" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 scrollbar-thin -mr-4 ">
            <p className="text-[11px] text-gray-dark text-center">Hoje</p>
            <div className="flex items-end gap-2.5 max-w-[85%] ">
              <Image
                src={Ada}
                alt="Ada"
                width={28}
                height={28}
                className="rounded-full object-cover w-7 h-7 flex-shrink-0"
              />
              <div className="flex flex-col gap-1">
                <p className="text-[11px] text-gray-dark font-medium">Ada</p>
                <div className="bg-gray-light px-3.5 py-2.5 rounded-2xl rounded-bl-none text-[13px] text-gray-soft leading-relaxed">
                  Olá! 👋 Sou a Ada, sua guia pelo portfólio do Pedro. Como
                  posso ajudar?
                </div>
                <p className="text-[10px] text-gray-dark/60 ml-1">19:55</p>
              </div>
            </div>

            <div className="flex flex-col items-end  gap-1 ml-auto max-w-[75%]">
              <div className="bg-orange-500 px-3.5 py-2.5 rounded-2xl rounded-br-none text-[13px] text-black/80 font-medium leading-relaxed">
                Gostaria de saber mais sobre os projetos.
              </div>
              <p className="text-[10px] text-gray-dark/60 mr-1">19:55</p>
            </div>

            <div className="flex items-end gap-2.5 max-w-[85%]">
              <Image
                src={Ada}
                alt="Ada"
                width={28}
                height={28}
                className="rounded-full object-cover w-7 h-7 flex-shrink-0"
              />
              <div className="flex flex-col gap-1">
                <div className="bg-gray-light px-3.5 py-2.5 rounded-2xl rounded-bl-none text-[13px] text-gray-soft leading-relaxed">
                  Claro! O Pedro trabalha com desenvolvimento FullStack e
                  Mobile. Quer saber sobre alguma tecnologia específica?
                </div>
                <p className="text-[10px] text-gray-dark/60 ml-1">19:55</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <button className="px-3 py-1.5 rounded-full border border-orange-500/40 text-orange-500 text-xs hover:bg-orange-500/10 transition-colors">
                Projetos recentes
              </button>
              <button className="px-3 py-1.5 rounded-full border border-orange-500/40 text-orange-500 text-xs hover:bg-orange-500/10 transition-colors">
                Tecnologias
              </button>
              <button className="px-3 py-1.5 rounded-full border border-orange-500/40 text-orange-500 text-xs hover:bg-orange-500/10 transition-colors">
                Contato
              </button>
            </div>
          </div>

          <div className="px-4 py-3 border-t border-white/5">
            <form action="" className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-gray-light text-gray-soft text-sm rounded-xl px-4 py-2.5 placeholder:text-gray-dark/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 border border-white/5 transition-all"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-400 text-black p-2.5 rounded-xl transition-colors flex-shrink-0"
                aria-label="Enviar mensagem"
              >
                <BsSendArrowUp size={16} />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Page;
