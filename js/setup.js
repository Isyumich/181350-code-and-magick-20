'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDCOUNT = 4;

// НАСТРОЙКА ПАРАМЕТРОВ ПЕРСОНАЖЕЙ

// Покажем окно выбора персонажей
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Функция получения случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Функция получения случайного элемента массива
var getRandomArrayElement = function (sourceArray) {
  return sourceArray[getRandomNumber(0, sourceArray.length - 1)];
};

// Функция создания волшебника
var getWizard = function () {
  return {
    name: getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES),
    coatColor: getRandomArrayElement(WIZARD_COAT_COLORS),
    eyeColor: getRandomArrayElement(WIZARD_EYE_COLORS)
  };
};

// Создание массива волшебников
var wizards = [];
for (var j = 0; j < WIZARDCOUNT; j++) {
  wizards[j] = getWizard();
}

// Функция рендеринга волшебника
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
};

// Сам рендеринг
var similarListElement = userDialog.querySelector('.setup-similar-list');

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

// Закрытие окна при нажатии на клавишу ESC
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && userNameInput !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

// Функция открытия окна
var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия окна
var closePopup = function () {
  setup.classList.add('hidden');

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

// СМЕНА ПАРАМЕТРОВ(ЦВЕТА) ПЕРСОНАЖЕЙ
var setupWizard = setup.querySelector('.setup-wizard');
var colorWizardCoat = setupWizard.querySelector('.wizard-coat');
var colorWizardEyes = setupWizard.querySelector('.wizard-eyes');
var colorFireball = setup.querySelector('.setup-fireball-wrap');
var inputColorWizardCoat = setup.querySelector('input[name="coat-color"]');
var inputColorWizardEyes = setup.querySelector('input[name="eyes-color"]');
var inputColorFireball = setup.querySelector('input[name="fireball-color"]');

// Обработчик для смены цвета плаща
colorWizardCoat.addEventListener('click', function () {
  var randomColorCoat = getRandomArrayElement(WIZARD_COAT_COLORS);
  colorWizardCoat.style.fill = randomColorCoat;
  inputColorWizardCoat.value = randomColorCoat;
});

// Обработчик для смены цвета глаз
colorWizardEyes.addEventListener('click', function () {
  var randomColorEyes = getRandomArrayElement(WIZARD_EYE_COLORS);
  colorWizardEyes.style.fill = randomColorEyes;
  inputColorWizardEyes.value = randomColorEyes;
});

// Обработчик для смены цвета фаербола
colorFireball.addEventListener('click', function () {
  var randomColorFireball = getRandomArrayElement(FIREBALL_COLORS);
  colorFireball.style.backgroundColor = randomColorFireball;
  inputColorFireball.value = randomColorFireball;
});

// ВАЛИДАЦИЯ ФОРМЫ
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
