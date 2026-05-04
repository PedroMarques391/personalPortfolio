interface IContentProps {
  children: React.ReactNode;
}

export function Content({ children }: IContentProps): React.JSX.Element {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 scrollbar-thin -mr-4">
      {children}
    </div>
  );
}
