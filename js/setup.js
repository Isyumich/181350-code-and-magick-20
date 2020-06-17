'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDCOUNT = 4;

  // Покажем окно выбора персонажей
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  // Функция создания волшебника
  var getWizard = function () {
    return {
      name: window.getRandomArrayElement(WIZARD_NAMES) + ' ' + window.getRandomArrayElement(WIZARD_SURNAMES),
      coatColor: window.getRandomArrayElement(WIZARD_COAT_COLORS),
      eyeColor: window.getRandomArrayElement(WIZARD_EYE_COLORS)
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

  // Смена цвета персонажей
  var colorWizardCoat = userDialog.querySelector('.wizard-coat');
  var colorWizardEyes = userDialog.querySelector('.wizard-eyes');
  var colorFireball = userDialog.querySelector('.setup-fireball-wrap');
  var inputColorWizardCoat = userDialog.querySelector('input[name="coat-color"]');
  var inputColorWizardEyes = userDialog.querySelector('input[name="eyes-color"]');
  var inputColorFireball = userDialog.querySelector('input[name="fireball-color"]');

  window.colorize(colorWizardCoat, inputColorWizardCoat, WIZARD_COAT_COLORS);
  window.colorize(colorWizardEyes, inputColorWizardEyes, WIZARD_EYE_COLORS);
  window.colorize(colorFireball, inputColorFireball, FIREBALL_COLORS);
})();


