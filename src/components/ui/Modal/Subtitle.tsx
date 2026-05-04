export function Subtitle({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <h2 className="text-[11px] text-gray-dark">{children}</h2>;
}
