interface IHeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: IHeaderProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
      {children}
    </div>
  );
}
