"use client";
import React, { useEffect, useState } from "react";

interface ITypewriterProps {
  color?: string;
  writing: string;
  delay?: number;
  hiddenCursor?: boolean;
}

const Typewriter = ({
  writing,
  delay = 200,
  hiddenCursor,
  color = "text-white",
}: ITypewriterProps): React.JSX.Element => {
  const [text, setText] = useState<string>("");
  const [showCursor, setShowCursor] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let charIndex = 0;
    let isCancelled = false;

    const startTyping = () => {
      if (isCancelled) return;
      setShowCursor(true);

      const typeNextChar = () => {
        if (isCancelled) return;
        if (charIndex < writing.length) {
          charIndex++;
          setText(writing.slice(0, charIndex));
          timeoutId = setTimeout(typeNextChar, 100);
        } else if (hiddenCursor) {
          setShowCursor(false);
        }
      };

      typeNextChar();
    };

    timeoutId = setTimeout(startTyping, delay);

    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [writing, delay, hiddenCursor]);

  return (
    <span className={`${color}`}>
      {text}
      {showCursor && (
        <span className="animate-pulse text-xl md:text-2xl font-medium">|</span>
      )}
    </span>
  );
};

export default React.memo(Typewriter);