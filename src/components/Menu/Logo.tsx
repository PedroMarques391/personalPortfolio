import Link from "next/link";
import { useParams } from "next/navigation";

const Logo = (): React.JSX.Element => {
  const { locale } = useParams();

  return (
    <Link
      href={`/${locale}/`}
      locale={undefined}
      prefetch
      className="absolute top-[50%] -translate-y-[50%] left-5 text-white flex flex-col text-lg leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-md p-1"
    >
      <code>{"<Pedro"}</code>
      <code className="text-orange-400 ml-5 md:ml-7">{"Marques/>"}</code>
    </Link>
  );
};

export default Logo;
