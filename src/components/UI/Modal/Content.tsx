interface ContentProps {
  children: React.ReactNode;
}

export function Content({ children }: ContentProps) {
  return <div className="px-5 mt-3 md:mt-1 text-center">{children}</div>;
}
