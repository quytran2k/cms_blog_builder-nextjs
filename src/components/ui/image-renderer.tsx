import { cn } from "@/lib/utils"; // If you're using shadcn or Tailwind
import Image from "next/image";

type ImageRendererProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  size?: number; // for square images like icons
  className?: string;
  priority?: boolean; // optional Next.js prop
};

export default function ImageRenderer({
  src,
  alt = "",
  width,
  height,
  size,
  className,
  priority = false,
}: ImageRendererProps) {
  const isSvg = src.endsWith(".svg");

  const finalWidth = size ?? width ?? 24;
  const finalHeight = size ?? height ?? 24;

  return (
    <span className={cn("inline-block", className)}>
      {isSvg ? (
        <img
          src={src}
          alt={alt}
          width={finalWidth}
          height={finalHeight}
          className="object-contain"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={finalWidth}
          height={finalHeight}
          className="object-cover"
          priority={priority}
        />
      )}
    </span>
  );
}
