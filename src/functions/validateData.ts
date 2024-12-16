// Validación de email
function validateEmail(id: string) {
  const resData = document.getElementById("resData") as HTMLElement;
  const emailElement = document.getElementById(id) as HTMLInputElement;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  let email = emailElement.value;

  if (email.length == 0) return false;

  if (!emailPattern.test(email)) {
    resData.innerHTML = "Invalid email";
    emailElement.value = "";
  } else {
    resData.innerHTML = "Email is valid, insert valid password";
    return true;
  }
  return false;
}

export { validateEmail };
