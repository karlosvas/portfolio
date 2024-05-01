export function toggleModal(event, id) {
    event.preventDefault();
    const modal = document.getElementById(id);
    modal?.classList.toggle('hidden');
}
window.toggleModal = toggleModal;
//# sourceMappingURL=logicModal.js.map