import Image, { ImageProps, StaticImageData } from "next/image";

interface IImageProps extends ImageProps {
  src: string | StaticImageData;
  alt: string;
}

export function ImageIcon({
  src,
  alt,
  ...rest
}: IImageProps): React.JSX.Element {
  return (
    <div className="relative">
      <Image
        {...rest}
        src={src}
        alt={alt}
        width={42}
        height={42}
        className="rounded-full object-cover w-10 h-10 "
        priority
      />
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#111111]" />
    </div>
  );
}
