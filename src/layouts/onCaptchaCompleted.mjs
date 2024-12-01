import { modal } from "./Layout.astro.0.mjs";

export function onCaptchaCompleted(token) {
  setTimeout(() => {
    modal.close();
  }, 300);
  window.updateTitle();
}
