import type { FC } from "react";

interface ImageComponentProps {
  alt: string;
  src: string;
  width: number;
  height: number;
  className?: string;
  quality?: number;
  priority?: boolean;
  loading?: "eager" | "lazy";
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  sizes?: string;
}

const ImageComponent: FC<ImageComponentProps> = ({ ...props }) => {
  return <img {...props} />;
};

export default ImageComponent;
