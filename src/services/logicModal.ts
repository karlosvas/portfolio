// Show or hide a modal
export function toggleModal(id: string) {
  const modal = document.getElementById(id);
  modal?.classList.toggle("hidden");
  modal?.classList.toggle("flex");
}
