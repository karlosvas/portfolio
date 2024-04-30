
export function toggleModal(event: Event, id: string) {
   event.preventDefault();
   const modal = document.getElementById(id);
   modal?.classList.toggle('hidden');
}

declare global {
   interface Window {
      toggleModal: (event: Event, id: string) => void;
   }
}

window.toggleModal = toggleModal;