export function toggleModal(event, id) {
    event.preventDefault();
    const modal = document.getElementById(id);
    modal === null || modal === void 0 ? void 0 : modal.classList.toggle('hidden');
}
window.toggleModal = toggleModal;
//# sourceMappingURL=logicModal.js.map