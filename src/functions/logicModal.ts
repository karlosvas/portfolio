
export function toggleModal(event: Event, id: string) {
   event.preventDefault();
   const modal = document.getElementById(id);
   modal?.classList.toggle('hidden');
}

export function setModalType(id: string, type: string) {
   const modal = document.getElementById(id);
   if (modal) {
      modal.innerHTML = type;
   }
}

declare global {
   interface Window {
      toggleModal: (event: Event, id: string) => void;
      setModalType: (id: string, type: string) => void;
   }
}

window.toggleModal = toggleModal;
window.setModalType = setModalType;