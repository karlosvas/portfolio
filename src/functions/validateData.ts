import { localSingin, localRegister } from './oauth2-0.js'

const resData = document.getElementById('resData') as HTMLElement;
export function validateEmail(id: string) {
   const emailElement = document.getElementById(id) as HTMLInputElement;
   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   let email = emailElement.value;

   if(email.length == 0) return false

   if (!emailPattern.test(email)) {
      colorText('red');
      resData.innerHTML = 'Invalid email';
      emailElement.value = '';
   } else {
      colorText('green');
      resData.innerHTML = 'Email is valid, insert valid password';
      return true
   }
   return false
}

export function validatePassword(id: string) {
   const passwordElement = document.getElementById(id) as HTMLInputElement;
   let password = passwordElement.value;

   if(password.length == 0) return false

   colorText('red')
   if (password.length < 8)
      resData.innerHTML = 'Password must be at least 8 characters long';
   else if (password.search(/[a-z]/) < 0)
      resData.innerHTML = 'Password must contain at least one lowercase letter';
   else if (password.search(/[A-Z]/) < 0)
      resData.innerHTML = 'Password must contain at least one uppercase letter';
   else if (password.search(/[0-9]/) < 0)
      resData.innerHTML = 'Password must contain at least one digit';
   else {
      colorText('green')
      resData.innerHTML = 'Password is valid, insert valid email';
      return true
   }
   return false
}

function colorText(color: string) {
   if (!resData.classList.contains('text-green-500') && !resData.classList.contains('text-red-500'))
      resData.classList.add(`text-${color}-500`);
   else if (color == 'red')
      resData.classList.replace('text-green-500', 'text-red-500');
   else if (color == 'green')
      resData.classList.replace('text-red-500', 'text-green-500');
}

export function validateLocalAuth(validateEmail: boolean, validatePassword: boolean, type: string) {
   if (validateEmail && validatePassword) {

      let email = document.getElementById('email') as HTMLInputElement;
      let password = document.getElementById('password') as HTMLInputElement;

      if(email && password){
         if (type == 'Login')
            localSingin(email.value, password.value, resData, type)
         else if (type == 'Register')
            localRegister(email.value, password.value, resData)
      } 
   }
}