'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var userNameInput = setup.querySelector('.setup-user-name');
  var minNameLength = userNameInput.minLength;
  var maxNameLength = userNameInput.maxLength;

  // Валидация при отправке формы
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  // Валидация при вводе каждого символа
  userNameInput.addEventListener('input', function () {
    var valueLength = userNameInput.value.length;

    if (valueLength < minNameLength) {
      userNameInput.setCustomValidity('Ещё ' + (minNameLength - valueLength) + ' симв.');
    } else if (valueLength > maxNameLength) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - maxNameLength) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
  });
})();
