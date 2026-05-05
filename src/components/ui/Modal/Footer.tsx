interface IFooterProps {
  children: React.ReactNode;
}

export function Footer({ children }: IFooterProps) {
  return (
    <div className="px-4 py-3 border-t border-white/5 space-y-2">
      {children}
    </div>
  );
}
