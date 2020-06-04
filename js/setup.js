'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Покажем окно выбора персонажей
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Функция получения случайного числа
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Создание списка персонажей
var wizards = [
  {
    name: WIZARD_NAMES[Math.round(getRandomNumber(1, 8))] + ' ' + WIZARD_SURNAMES[Math.round(getRandomNumber(1, 8))],
    coatColor: WIZARD_COAT_COLORS[Math.round(getRandomNumber(1, 8))],
    eyeColor: WIZARD_EYE_COLORS[Math.round(getRandomNumber(1, 8))]
  },
  {
    name: WIZARD_NAMES[Math.round(getRandomNumber(1, 8))] + ' ' + WIZARD_SURNAMES[Math.round(getRandomNumber(1, 8))],
    coatColor: WIZARD_COAT_COLORS[Math.round(getRandomNumber(1, 8))],
    eyeColor: WIZARD_EYE_COLORS[Math.round(getRandomNumber(1, 8))]
  },
  {
    name: WIZARD_NAMES[Math.round(getRandomNumber(1, 8))] + ' ' + WIZARD_SURNAMES[Math.round(getRandomNumber(1, 8))],
    coatColor: WIZARD_COAT_COLORS[Math.round(getRandomNumber(1, 8))],
    eyeColor: WIZARD_EYE_COLORS[Math.round(getRandomNumber(1, 8))]
  },
  {
    name: WIZARD_NAMES[Math.round(getRandomNumber(1, 8))] + ' ' + WIZARD_SURNAMES[Math.round(getRandomNumber(1, 8))],
    coatColor: WIZARD_COAT_COLORS[Math.round(getRandomNumber(1, 8))],
    eyeColor: WIZARD_EYE_COLORS[Math.round(getRandomNumber(1, 8))]
  }
];

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
