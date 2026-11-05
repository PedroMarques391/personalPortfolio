import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { BsSendArrowUp } from "react-icons/bs";
import { Modal } from "../Modal";

interface ChatFooterProps {
  onSendMessage: (text: string) => void;
}

const ChatFooter = ({ onSendMessage }: ChatFooterProps): React.JSX.Element => {
  const [input, setInput] = useState("");
  const t = useTranslations("components.chat");

  const suggestions: string[] = [
    t("suggestion1"),
    t("suggestion2"),
    t("suggestion3"),
    t("suggestion4"),
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <Modal.Footer>
      <div className="grid grid-cols-2 gap-2 px-4 w-full max-w-4xl mx-auto">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSendMessage(suggestion)}
            className="px-4 py-2 bg-gray-light text-gray-soft text-sm rounded-xl hover:text-orange-400 transition-colors border-2 border-transparent hover:border-orange-500 duration-300"
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
          placeholder={t("inputPlaceholder")}
          className="flex-1 bg-gray-light text-gray-soft text-sm rounded-xl px-4 py-2.5 placeholder:text-gray-dark/50 focus:outline-none outline-none focus:ring-1 focus:ring-orange-500/30 border border-white/5 transition-all disabled:opacity-50"
        />
        <Modal.ActionButton
          type="submit"
          className="bg-orange-500 hover:bg-orange-400 text-black p-2.5 rounded-xl transition-colors flex-shrink-0 disabled:opacity-50 disabled:hover:bg-orange-500"
          aria-label={t("sendAriaLabel")}
          disabled={!input.trim()}
        >
          <BsSendArrowUp size={16} />
        </Modal.ActionButton>
      </form>
    </Modal.Footer>
  );
};

export default ChatFooter;
