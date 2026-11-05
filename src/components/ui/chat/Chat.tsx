import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { BsArrowsAngleExpand, BsArrowsMove } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Ada from "../../../../public/assets/ada.webp";
import { Modal } from "../Modal";
import ChatFooter from "./ChatFooter";
import ChatMessageList from "./ChatMessageList";

interface ChatProps {
  showChatModal: boolean;
  handleCloseModal: () => void;
}

const Chat = ({
  showChatModal,
  handleCloseModal,
}: ChatProps): React.JSX.Element => {
  const [isCentered, setIsCentered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("components.chat");
  const locale = useLocale();

  const { messages, sendMessage, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      headers: {
        "x-locale": locale,
      },
    }),
    onError: (e: unknown) => {
      let errorMessage = t("genericError");
      const errMsg = e instanceof Error ? e.message : "";
      const errStatus =
        typeof e === "object" && e !== null && "status" in e
          ? (e as { status?: number }).status
          : undefined;

      if (
        errMsg.includes("credits") ||
        errMsg.includes("tokens") ||
        errStatus === 402
      ) {
        errorMessage = t("creditsError");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: errorMessage,
          parts: [
            {
              type: "text",
              text: errorMessage,
            },
          ],
          createdAt: new Date(),
        },
      ]);
    },
  });

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
          <Modal.ImageIcon src={Ada} alt={t("avatarAlt")} />
          <div>
            <Modal.Title>Ada</Modal.Title>
            <Modal.Subtitle>{t("onlineStatus")}</Modal.Subtitle>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Modal.ActionButton
            aria-label={t("centerLabel")}
            aria-roledescription="button"
            title={t("centerLabel")}
            onClick={() => setIsCentered((prev) => !prev)}
          >
            <BsArrowsMove
              size={16}
              className={isCentered ? "text-orange-600" : "text-gray-dark"}
            />
          </Modal.ActionButton>
          <Modal.ActionButton
            aria-label={t("expandLabel")}
            aria-roledescription="button"
            title={t("expandLabel")}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <BsArrowsAngleExpand
              size={16}
              className={isExpanded ? "text-orange-600" : "text-gray-dark"}
            />
          </Modal.ActionButton>
          <Modal.ActionButton
            aria-label={t("closeLabel")}
            aria-roledescription="button"
            title={t("closeLabel")}
            onClick={handleCloseModal}
          >
            <GrClose size={16} className="text-gray-dark" />
          </Modal.ActionButton>
        </div>
      </Modal.Header>

      <ChatMessageList messages={messages} />
      <ChatFooter onSendMessage={(text) => sendMessage({ text })} />
    </Modal.Root>
  );
};

export default Chat;
