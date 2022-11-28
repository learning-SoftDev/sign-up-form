//Setting up variables
const buttonSignUp = document.querySelector('#button-signup');
const inputs = document.querySelectorAll('input');
const myForm = document.getElementById('my-form');
const phone = document.querySelector('#phonenumber');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');
const errorPasswordConfirm = document.querySelector('.error-passwordConfirm');
const errorPhone = document.querySelector('.error-phone');
const errorAll = document.querySelector('.error-all');

//Logic for submitting the form validation
let submitForm = false;

//Errors with pattern logic - error messages
const arrAll = ['email', 'phonenumber', 'password'];
const arrError = [
  'Please enter a valid email (e.g.learningSoftDev@gmail.com)',
  'Please enter 11 digit phone number',
  '• Password must be at least 8 characters' +
    '<br>' +
    '• Contains at least  1 number' +
    '<br>' +
    '• Contains at least 1 uppercase letter',
];

myForm.addEventListener('change', function (e) {
  let errorCount = 0;
  let errorIndex = arrAll.indexOf(e.target.id);
  let queryError = document.getElementById('my-form').querySelectorAll('.error');
  //if the element has a pattern attribute or it is an email type, then apply each unique validations
  if (e.target.hasAttribute('pattern') || e.target.type === 'email') {
    if (e.target.validity.patternMismatch || e.target.validity.typeMismatch) {
      e.target.classList.add('border-red');
      queryError[errorIndex].innerHTML = arrError[errorIndex];
    } else {
      e.target.classList.remove('border-red');
      queryError[errorIndex].textContent = '';
    } //else apply the logic below for those fields without any patterns
  } else {
    e.target.classList.remove('border-red');
  }
  passwordConfirmValidation();

  //Check if all inputs have valid contents, if yes then set submitForm to true to be able to submit the form
  for (items of myForm) {
    errorCount += items.classList.length;
  }
  if (errorCount === 0) {
    errorAll.textContent = '';
    submitForm = true;
  } else {
    submitForm = false;
  }
});

//password confirmation validation
function passwordConfirmValidation() {
  if (passwordConfirm.value === '' || password.value === '') return;
  if (passwordConfirm.value !== password.value) {
    passwordConfirm.classList.add('border-red');
    password.classList.add('border-red');
    errorPasswordConfirm.textContent = 'Password should match. Try again.';
  } else {
    passwordConfirm.classList.remove('border-red');
    password.classList.remove('border-red');
    errorPasswordConfirm.textContent = '';
  }
}

//If submit was pressed with missing fields
buttonSignUp.onclick = function () {
  let blankCount = 0;
  for (items of inputs) {
    if (items.value === '') {
      items.classList.add('border-red');
      blankCount++;
    }
  }
  if (blankCount > 0) {
    errorAll.textContent = 'Please fill out all required fields.';
  }
};
