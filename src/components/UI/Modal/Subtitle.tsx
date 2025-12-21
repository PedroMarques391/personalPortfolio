interface SubtitleProps {
  children: React.ReactNode;
}

export function Subtitle({ children }: SubtitleProps) {
  return <h2 className="px-5 text-sm text-center mt-2 md:mt-1">{children}</h2>;
}
