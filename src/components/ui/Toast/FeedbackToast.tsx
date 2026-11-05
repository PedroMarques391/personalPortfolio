import { IToastMessage } from "@/hooks/useToastFeedback";
import React from "react";
import { IoClose } from "react-icons/io5";
import { ActionButton } from "./ActionButton";
import { Content } from "./Content";
import { Icon } from "./Icon";
import { Root } from "./Root";
import { Subtitle } from "./Subtitle";
import { Title } from "./Title";

interface FeedbackToastProps {
  open: boolean;
  message: IToastMessage | null;
  onClose: () => void;
}

export function FeedbackToast({
  open,
  message,
  onClose,
}: FeedbackToastProps): React.JSX.Element {
  return (
    <Root type={message?.success ? "success" : "error"} open={open}>
      <ActionButton onClick={onClose}>
        <Icon icon={IoClose} color="red" size={20} />
      </ActionButton>
      <Title>{message?.title}</Title>
      <Subtitle>{message?.subtitle}</Subtitle>
      {message?.content && (
        <Content>
          <p>{message.content}</p>
        </Content>
      )}
    </Root>
  );
}
