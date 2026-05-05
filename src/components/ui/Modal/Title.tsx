export function Title({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <h1 className="text-sm font-semibold text-gray-soft tracking-wide">
      {children}
    </h1>
  );
}
