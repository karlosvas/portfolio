// Enseñar u ocultar un modal
export function toggleModal(id: string) {
  const modal = document.getElementById(id);
  modal?.classList.toggle("hidden");
}

declare global {
  interface Window {
    toggleModal: (id: string) => void;
  }
}
