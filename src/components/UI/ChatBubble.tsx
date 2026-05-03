type ChatBubbleProps = {
  message: string;
  role: "user" | "assistant";
  id: string;
  index: number;
  time: string;
};

const ChatBubble = ({
  message,
  role,
  id,
  index,
  time,
}: ChatBubbleProps): React.JSX.Element => {
  return (
    <div key={`${id}-${index}`} className="flex flex-col gap-1">
      <div
        className={
          role === "user"
            ? "bg-orange-500 px-3.5 py-2.5 rounded-2xl rounded-br-none text-[13px] text-black/80 font-medium leading-relaxed"
            : "bg-gray-light px-3.5 py-2.5 rounded-2xl rounded-bl-none text-[13px] text-gray-soft leading-relaxed"
        }
      >
        {message}
      </div>
      <p
        className={`text-[10px] text-gray-dark font-medium ${
          role === "user" ? "text-right" : "text-left"
        }`}
      >
        {time}
      </p>
    </div>
  );
};

export default ChatBubble;
