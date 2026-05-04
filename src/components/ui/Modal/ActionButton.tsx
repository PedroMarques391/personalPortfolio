import { ButtonHTMLAttributes } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ActionButton({ children, ...rest }: ActionButtonProps) {
  return (
    <button
      className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
      {...rest}
    >
      {children}
    </button>
  );
}
