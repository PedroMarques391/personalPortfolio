interface TitleProps {
  children: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  return <h1 className="text-xl font-semibold text-center">{children}</h1>;
}
