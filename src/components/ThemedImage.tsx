import Image from "next/image";

type Props = {
  light: string;
  dark: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/** Renders the light and dark variants of an image; CSS shows the one matching the active theme. */
export function ThemedImage({ light, dark, alt, width, height, className = "", priority = false }: Props) {
  return (
    <>
      <Image className={`only-light ${className}`.trim()} src={light} alt={alt} width={width} height={height} priority={priority} />
      <Image className={`only-dark ${className}`.trim()} src={dark} alt={alt} width={width} height={height} priority={priority} />
    </>
  );
}
