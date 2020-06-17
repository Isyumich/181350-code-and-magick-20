'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var userDialog = document.querySelector('.setup');
  var setupClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');

  // Закрытие окна при нажатии на клавишу ESC
  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && userNameInput !== document.activeElement) {
      evt.preventDefault();
      closePopup();
    }
  };

  // Функция открытия окна
  var openPopup = function () {
    userDialog.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия окна
  var closePopup = function () {
    userDialog.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Обработчики для модального окна
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePopup();
    }
  });
})();

