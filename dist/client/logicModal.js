export function showModal(btn, divModal) {
    btn.addEventListener('click', (event) => {
        // Show or hide the modal
        event.preventDefault();
        let modal = document.getElementById('modal');
        if (modal && modal.classList.contains('hidden')) {
            divModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '17px';
            document.getElementsByTagName('header')[0].style.paddingRight = '57px';
        }
        else {
            divModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
            document.getElementsByTagName('header')[0].style.paddingRight = '40px';
        }
    });
}
export function closeModal(btnClose, divModal) {
    // Close modal
    btnClose.addEventListener('click', (event) => {
        event.preventDefault();
        divModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0px';
        document.getElementsByTagName('header')[0].style.paddingRight = '40px';
    });
}
//# sourceMappingURL=logicModal.js.map