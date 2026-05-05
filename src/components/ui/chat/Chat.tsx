import { getTimeForMessage } from "@/utils/time";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  BsArrowsAngleExpand,
  BsArrowsMove,
  BsSendArrowUp,
} from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Ada from "../../../../public/assets/ada.jpg";
import { Modal } from "../Modal";
import ChatBubble from "./ChatBubble";

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
  const [isCentered, setIsCentered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const suggestions: string[] = [
    "Olá!",
    "Quais os principais projetos?",
    "Quem é Ada?",
    "O que você consegue fazer por aqui?",
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

  const handleCenterModal = () => {
    setIsCentered((prev) => !prev);
  };

  const handleExpandModal = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Modal.Root
      open={showChatModal}
      position={isCentered ? "center" : "bottom-right"}
      size={isExpanded ? "expanded" : "default"}
      onClose={handleCloseModal}
      showCloseButton={false}
    >
      <Modal.Header>
        <div className="flex items-center gap-3">
          <Modal.ImageIcon src={Ada} alt="Avatar da Ada" />
          <div>
            <Modal.Title>Ada</Modal.Title>
            <Modal.Subtitle>Online</Modal.Subtitle>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Modal.ActionButton
            aria-label="Centralizar"
            aria-roledescription="button"
            title="Centralizar"
            onClick={handleCenterModal}
          >
            <BsArrowsMove size={16} className="text-gray-dark" />
          </Modal.ActionButton>
          <Modal.ActionButton
            aria-label="Expandir"
            aria-roledescription="button"
            title="Expandir"
            onClick={handleExpandModal}
          >
            <BsArrowsAngleExpand size={16} className="text-gray-dark" />
          </Modal.ActionButton>
          <Modal.ActionButton
            aria-label="Fechar"
            aria-roledescription="button"
            title="Fechar"
            onClick={handleCloseModal}
          >
            <GrClose size={16} className="text-gray-dark" />
          </Modal.ActionButton>
        </div>
      </Modal.Header>

      <Modal.Content>
        <p className=" text-gray-dark text-center">Hoje</p>

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
              className={message.role !== "user" ? "flex flex-col gap-1" : ""}
            >
              {message.role !== "user" && (
                <p className="text-[11px] text-gray-dark font-medium">Ada </p>
              )}

              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <ChatBubble
                        key={`${message.id}-${i}`}
                        message={part.text}
                        role={message.role as "user" | "assistant"}
                        id={message.id}
                        index={i}
                        time={getTimeForMessage(message.id, i)}
                      />
                    );
                  case "tool-recentsProjects":
                    if ("state" in part && part.state === "output-available") {
                      const result = part.output as {
                        answer: string;
                        lastProjecs: string;
                      };
                      const messageText = result
                        ? `${result.lastProjecs}`
                        : "Buscando projetos...";
                      return (
                        <ChatBubble
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

                  case "tool-whoAreYou":
                    if ("state" in part && part.state === "output-available") {
                      const { response } = part.output as { response: string };
                      return (
                        <ChatBubble
                          key={`${message.id}-${i}`}
                          message={response}
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
      </Modal.Content>

      <Modal.Footer>
        <div className="grid grid-cols-2 gap-2 px-4 w-full max-w-4xl mx-auto">
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

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 w-full max-w-5xl mx-auto"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-gray-light text-gray-soft text-sm rounded-xl px-4 py-2.5 placeholder:text-gray-dark/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 border border-white/5 transition-all disabled:opacity-50"
          />
          <Modal.ActionButton
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 text-black p-2.5 rounded-xl transition-colors flex-shrink-0 disabled:opacity-50 disabled:hover:bg-orange-500"
            aria-label="Enviar mensagem"
            disabled={!input.trim()}
          >
            <BsSendArrowUp size={16} />
          </Modal.ActionButton>
        </form>
      </Modal.Footer>
    </Modal.Root>
  );
};

export default Chat;
