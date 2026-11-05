import { getTimeForMessage } from "@/utils/time";
import { UIMessage } from "ai";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Ada from "../../../../public/assets/ada.webp";
import { Modal } from "../Modal";
import ChatBubble from "./ChatBubble";

interface ChatMessageListProps {
  messages: UIMessage[];
}

const ChatMessageList = ({
  messages,
}: ChatMessageListProps): React.JSX.Element => {
  const t = useTranslations("components.chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Modal.Content>
      <p className="text-gray-dark text-center">{t("todayLabel")}</p>

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
              <p className="text-[11px] text-gray-dark font-medium">Ada</p>
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
                      : t("fetchingProjects");
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
  );
};

export default ChatMessageList;
