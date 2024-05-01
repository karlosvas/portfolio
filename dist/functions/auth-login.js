import { localSingin, localRegister } from './oauth2-0';
let email = '';
let password = '';
const resData = document.getElementById('resData');
export function validateEmail(id) {
    const emailElement = document.getElementById(id);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    email = emailElement.value;
    if (!emailPattern.test(email)) {
        colorText('red');
        resData.innerHTML = 'Invalid email';
        emailElement.value = '';
    }
    else {
        colorText('green');
        resData.innerHTML = 'Email is valid, insert valid password';
        return true;
    }
    return false;
}
export function validatePassword(id) {
    const passwordElement = document.getElementById(id);
    password = passwordElement.value;
    colorText('red');
    if (password.length < 8)
        resData.innerHTML = 'Password must be at least 8 characters long';
    else if (password.search(/[a-z]/) < 0)
        resData.innerHTML = 'Password must contain at least one lowercase letter';
    else if (password.search(/[A-Z]/) < 0)
        resData.innerHTML = 'Password must contain at least one uppercase letter';
    else if (password.search(/[0-9]/) < 0)
        resData.innerHTML = 'Password must contain at least one digit';
    else {
        colorText('green');
        resData.innerHTML = 'Password is valid, insert valid email';
        return true;
    }
    return false;
}
function colorText(color) {
    if (!resData.classList.contains('text-green-500') && !resData.classList.contains('text-red-500'))
        resData.classList.add(`text-${color}-500`);
    else if (color == 'red')
        resData.classList.replace('text-green-500', 'text-red-500');
    else if (color == 'green')
        resData.classList.replace('text-red-500', 'text-green-500');
}
export function validateLocalAuth(validateEmail, validatePassword, type) {
    console.log(type);
    if (validateEmail && validatePassword) {
        if (type == 'Login')
            localSingin(email, password, resData, type);
        else if (type == 'Register')
            localRegister(email, password);
    }
}
//# sourceMappingURL=auth-login.js.map