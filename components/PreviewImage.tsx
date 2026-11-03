import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; thumbnail?: boolean };
export default function PreviewImage({ src, thumbnail, sizes = "(max-width: 800px) 90vw, 650px", ...props }: Props) {
  const preview = (width: number) => encodeURI(src.replace("/project-images/", "/project-images/previews/").replace(".png", "-" + width + ".webp"));
  return <img {...props} src={preview(thumbnail ? 160 : 640)}
    srcSet={thumbnail ? undefined : [640, 1100].map(w => preview(w) + " " + w + "w").join(", ")}
    sizes={thumbnail ? undefined : sizes} />;
}
