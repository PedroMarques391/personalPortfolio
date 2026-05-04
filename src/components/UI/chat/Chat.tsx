import { getTimeForMessage } from "@/utils/time";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  BsArrowsAngleExpand,
  BsArrowsMove,
  BsSendArrowUp,
} from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { IoReloadOutline } from "react-icons/io5";
import Ada from "../../../../public/assets/ada.jpg";
import ChatBuble from "./ChatBubble";

interface ChatProps {
  showChatModal: boolean;
  handleCloseModal: () => void;
}

const Chat = ({
  showChatModal,
  handleCloseModal,
}: ChatProps): React.JSX.Element => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const suggestions: string[] = [
    "Qual a stack principal?",
    "Projeto Recente?",
    "Quais banco de dados você utiliza?",
    "Quais ferramentas de deploy você utiliza?",
  ];

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onError: (e) => {
      console.error(e);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (showChatModal && modalRef.current && !modalRef.current.open) {
      modalRef.current.showModal();
    }
  }, [showChatModal]);

  return (
    <AnimatePresence>
      {showChatModal && (
        <motion.dialog
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#111111] w-[42rem] h-[32rem] rounded-2xl text-white backdrop:bg-black/90 p-0 outline-none shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-white/5 overflow-hidden fixed bottom-4 right-4 mb-0 mr-0 ml-auto mt-auto flex flex-col z-50"
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
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Centralizar"
                  aria-roledescription="button"
                  title="Centralizar"
                >
                  <BsArrowsMove size={16} className="text-gray-dark" />
                </button>
                <button
                  className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Expandir"
                  title="Expandir"
                  aria-roledescription="button"
                >
                  <BsArrowsAngleExpand size={16} className="text-gray-dark" />
                </button>
                <button
                  className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Recarregar"
                  title="Recarregar"
                  aria-roledescription="button"
                >
                  <IoReloadOutline size={16} className="text-gray-dark" />
                </button>
                <button
                  className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  onClick={handleCloseModal}
                  aria-roledescription="button"
                  title="Fechar"
                  aria-label="Fechar"
                >
                  <CgClose size={16} className="text-gray-dark" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 scrollbar-thin -mr-4">
              <p className="text-[11px] text-gray-dark text-center">Hoje</p>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "flex flex-col items-end gap-1 ml-auto max-w-[75%]"
                      : "flex items-end gap-2.5 max-w-[85%]"
                  }
                >
                  {message.role !== "user" && (
                    <Image
                      src={Ada}
                      alt="Ada"
                      width={28}
                      height={28}
                      className="rounded-full object-cover w-7 h-7 flex-shrink-0"
                    />
                  )}

                  <div
                    className={
                      message.role !== "user" ? "flex flex-col gap-1" : ""
                    }
                  >
                    {message.role !== "user" && (
                      <p className="text-[11px] text-gray-dark font-medium">
                        Ada{" "}
                      </p>
                    )}

                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <ChatBuble
                              key={`${message.id}-${i}`}
                              message={part.text}
                              role={message.role as "user" | "assistant"}
                              id={message.id}
                              index={i}
                              time={getTimeForMessage(message.id, i)}
                            />
                          );
                        case "tool-recentsProjects":
                          if (
                            "state" in part &&
                            part.state === "output-available"
                          ) {
                            const result = part.output as {
                              answer: string;
                              lastProjecs: string;
                            };
                            const messageText = result
                              ? `${result.lastProjecs}`
                              : "Buscando projetos...";
                            return (
                              <ChatBuble
                                key={`${message.id}-${i}`}
                                message={messageText}
                                role={message.role as "user" | "assistant"}
                                id={message.id}
                                index={i}
                                time={getTimeForMessage(message.id, i)}
                              />
                            );
                          }
                          return null;

                        default:
                          return null;
                      }
                    })}
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            <div className="grid grid-cols-2 gap-2 px-4">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage({ text: suggestion })}
                  className="px-4 py-2 bg-gray-light text-gray-soft text-sm rounded-xl hover:bg-gray-dark transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-white/5">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-light text-gray-soft text-sm rounded-xl px-4 py-2.5 placeholder:text-gray-dark/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 border border-white/5 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-400 text-black p-2.5 rounded-xl transition-colors flex-shrink-0 disabled:opacity-50 disabled:hover:bg-orange-500"
                  aria-label="Enviar mensagem"
                  disabled={!input.trim()}
                >
                  <BsSendArrowUp size={16} />
                </button>
              </form>
            </div>
          </div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

export default Chat;
