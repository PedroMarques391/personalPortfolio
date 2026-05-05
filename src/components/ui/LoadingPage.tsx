export const LoadingPage = (): React.JSX.Element => {
  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden flex items-center justify-center bg-gradient-to-r from-black to-gray-light">
      <div className="flex flex-col items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-orange-500" />
      </div>
    </div>
  );
};
