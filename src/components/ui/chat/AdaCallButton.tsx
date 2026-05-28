"use client";

import { useChatModal } from "@/hooks/useChatModal";
import { useTranslations } from "next-intl";
import { LuBot } from "react-icons/lu";
import { Button } from "../Button";

const AdaCallButton = () => {
  const { openChat } = useChatModal();
  const t = useTranslations("components.ada");

  return (
    <Button
      onClick={openChat}
      styles="w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:shadow-orange-500/50 border-0 font-bold tracking-wide hover:text-black/90"
    >
      <LuBot size={22} className="mr-1" />
      {t("callButtonText")}
    </Button>
  );
};

export default AdaCallButton;
