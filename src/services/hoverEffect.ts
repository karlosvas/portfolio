import hoverEffect from "@/shaders/hover-effect.glsl?raw";
import { createImageShader } from "./imageShader";

interface Options {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  focus?: [number, number];
  dim?: [number, number];
  onShow?: () => void;
}

export function attachHoverEffect({ container, canvas, image, focus = [0.5, 0.5], dim, onShow }: Options) {
  if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      createImageShader({
        canvas,
        fragmentBody: hoverEffect,
        imageSrc: image.currentSrc || image.src,
        focus,
        dim,
        pointerTarget: container,
        onReady: () => {
          canvas.classList.remove("hidden");
          image.classList.add("hidden");
          onShow?.();
        },
      });
    },
    { rootMargin: "200px" },
  );
  observer.observe(container);
}
