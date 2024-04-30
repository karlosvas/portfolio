import { localSingin, localRegister } from './oauth2-0'
import { stateAuthFirebase } from './oauth2-0'

let email: string = '';
let password: string = '';
const resData = document.getElementById('resData') as HTMLElement;

export function validateEmail(id: string) {
   const emailElement = document.getElementById(id) as HTMLInputElement;
   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   email = emailElement.value;

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
   password = passwordElement.value;

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
   console.log(type)
   if (validateEmail && validatePassword) {
      if (type == 'Login')
         localSingin(email, password)
      else if (type == 'Register')
         localRegister(email, password)

      resData.innerHTML = `User ${type} in successfully ✅`;
      if (!document.getElementById('modal')?.classList.contains('hidden')) {
         setTimeout(() => {
            document.getElementById('modal')?.classList.add('hidden');
            stateAuthFirebase('login');
            resData.innerHTML = ''
         }, 2000);
      }
   }
}