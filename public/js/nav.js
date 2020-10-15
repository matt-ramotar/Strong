const loginButton = document.querySelector('#login-button');

loginButton.addEventListener('click', async e => {
  e.preventDefault();
  loginButton.classList.add('modal');
});
