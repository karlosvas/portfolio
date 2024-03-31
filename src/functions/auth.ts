const resData = document.getElementById('resData') as HTMLElement;

export function validateEmail(id: string) {
   const isEmail = document.getElementById(id) as HTMLInputElement;
   const email = isEmail.value;
   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   if (!emailPattern.test(email)) {
      resData.innerHTML = 'Invalid email';

      resData.classList.replace('text-green-500', 'text-red-500');

      resData.classList.add('text-red-500');
      isEmail.value = '';
   } else {
      localStorage.setItem('emailValid', 'true');
      if (localStorage.getItem('emailValid') === 'true' && localStorage.getItem('passwordValid') === 'true') {
         resData.innerHTML = 'User logged in successfully ✅';
         (document.getElementById('login') as HTMLElement).innerHTML = 'Logout';
      } else {
         resData.innerHTML = 'Email is valid';
      }

      resData.classList.replace('text-red-500', 'text-green-500');
   }
}

export function validatePassword(id: string) {
   const inPassword = document.getElementById(id) as HTMLInputElement;
   const password = inPassword.value;

   if (password === '' || localStorage.getItem('emailValid') !== 'true') return;

   if (password.length < 8) {
      resData.innerHTML = 'Password must be at least 8 characters long';
   } else if (password.search(/[a-z]/) < 0) {
      resData.innerHTML = 'Password must contain at least one lowercase letter';
   } else if (password.search(/[A-Z]/) < 0) {
      resData.innerHTML = 'Password must contain at least one uppercase letter';
   } else if (password.search(/[0-9]/) < 0) {
      resData.innerHTML = 'Password must contain at least one digit';
   } else {
      localStorage.setItem('passwordValid', 'true');

      if (localStorage.getItem('emailValid') === 'true' && localStorage.getItem('passwordValid') === 'true') {
         resData.innerHTML = 'User logged in successfully ✅';
         (document.getElementById('login') as HTMLElement).innerHTML = 'Logout';
      } else {
         resData.innerHTML = 'Password is valid';
      }

      resData.classList.replace('text-red-500', 'text-green-500');
      return;
   }
   resData.classList.replace('text-green-500', 'text-red-500');
   inPassword.value = '';
}

export interface LoginData {
   emailValid: string;
   passwordValid: string;
}

export function changeLogout(emailValid: string, passwordValid: string) {
   if (emailValid === 'true' && passwordValid === 'true') {
      let login = document.getElementById('login') as HTMLElement;
      let resData = document.getElementById('resData') as HTMLElement;

      localStorage.setItem('emailValid', 'false');
      localStorage.setItem('passwordValid', 'false');
      login.innerHTML = 'Login';
      resData.innerHTML = '';
   }
}

