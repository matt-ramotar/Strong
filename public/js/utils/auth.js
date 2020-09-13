export const disableFormButton = (inputsQuery, buttonQuery) => {
  const inputs = document.querySelectorAll(inputsQuery);

  const button = document.querySelector(buttonQuery);

  const isAnyInputValueEmpty = () => {
    for (let input of inputs) {
      if (input.value === '') return true;
    }
    return false;
  };

  inputs.forEach(input => {
    input.addEventListener('input', e => {
      if (!isAnyInputValueEmpty()) {
        button.disabled = false;
      } else {
        button.disableed = true;
      }
    });
  });
};
