import hoverEffect from "@/shaders/hover-effect.glsl?raw";
import { createImageShader } from "./imageShader";

interface Options {
  /** Elemento que recibe el ratón (la tarjeta, o el marco de la foto) */
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  /** La <img> que se ve sin WebGL / sin JS / mientras carga; se oculta cuando el efecto está listo */
  image: HTMLImageElement;
  /** Igual que `object-position` de la <img> */
  focus?: [number, number];
  /** Velo oscuro [arriba-izquierda, abajo-derecha], para fotos con texto encima */
  dim?: [number, number];
  /** Se llama cuando el lienzo ya se ve (p. ej. para quitar un velo CSS que ahora hace el shader) */
  onShow?: () => void;
}

/**
 * Pone el efecto de la web (src/shaders/hover-effect.glsl) sobre una imagen.
 * El WebGL se crea la primera vez que la imagen entra en pantalla, no al cargar la página.
 * Con "reducir movimiento" o sin WebGL2 se queda la imagen normal.
 */
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
