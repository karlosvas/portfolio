import { localSingin, localRegister } from './oauth2-0.js'

const resData = document.getElementById('resData') as HTMLElement;

export function validateEmail(id: string) {
   const emailElement = document.getElementById(id) as HTMLInputElement;
   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

   let email = emailElement.value;

   if(email.length == 0) return false

   if (!emailPattern.test(email)) {
      resData.innerHTML = 'Invalid email';
      emailElement.value = '';
   } else {
      resData.innerHTML = 'Email is valid, insert valid password';
      return true
   }
   return false
}

export function validatePassword(id: string) {
   const passwordElement = document.getElementById(id) as HTMLInputElement;
   let password = passwordElement.value;

   if(password.length == 0) return false

   if (password.length < 8)
      resData.innerHTML = 'Password must be at least 8 characters long';
   else if (password.search(/[a-z]/) < 0)
      resData.innerHTML = 'Password must contain at least one lowercase letter';
   else if (password.search(/[A-Z]/) < 0)
      resData.innerHTML = 'Password must contain at least one uppercase letter';
   else if (password.search(/[0-9]/) < 0)
      resData.innerHTML = 'Password must contain at least one digit';
   else {
      resData.innerHTML = 'Password is valid, insert valid email';
      return true
   }
   return false
}

export function validateLocalAuth(validateEmail: boolean, validatePassword: boolean, type: string) {
   if (validateEmail && validatePassword) {
      
      let email = document.getElementById('email') as HTMLInputElement;
      let password = document.getElementById('password') as HTMLInputElement;

      if(email && password){
         resData.innerHTML = '';
         if (type == 'Login')
            localSingin(email.value, password.value, resData, type)
         else if (type == 'Register')
            localRegister(email.value, password.value, resData)
      } 
   }
}