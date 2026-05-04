import { ButtonHTMLAttributes } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ActionButton({ children, ...rest }: ActionButtonProps) {
  return (
    <button className="absolute top-2 right-2 text-lg" {...rest}>
      {children}
    </button>
  );
}
