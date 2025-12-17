export const LoadingPage = (): React.JSX.Element => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-r from-black to-gray-light">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-orange-500 mb-4"></div>
      </div>
    </div>
  );
};
