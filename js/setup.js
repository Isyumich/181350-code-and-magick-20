'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  // Покажем окно выбора персонажей
  var userDialog = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  userDialog.classList.remove('hidden');
  /*
  // Функция создания волшебника
  var getWizard = function () {
    return {
      name: window.util.getRandomArrayElement(WIZARD_NAMES) + ' ' + window.util.getRandomArrayElement(WIZARD_SURNAMES),
      coatColor: window.util.getRandomArrayElement(WIZARD_COAT_COLORS),
      eyeColor: window.util.getRandomArrayElement(WIZARD_EYE_COLORS)
    };
  };

  // Создание массива волшебников
  var wizards = [];
  for (var j = 0; j < WIZARDCOUNT; j++) {
    wizards[j] = getWizard();
  }
*/
  // Функция рендеринга волшебника

  // .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

    return wizardElement;
  };

  // Сам рендеринг
  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onLoad = function () {
    userDialog.classList.add('hidden');
  };

  window.backend.load(successHandler, errorHandler);

  var form = userDialog.querySelector('.setup-wizard-form');
  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), onLoad, errorHandler);
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);


  // Смена цвета персонажей
  var colorWizardCoat = userDialog.querySelector('.wizard-coat');
  var colorWizardEyes = userDialog.querySelector('.wizard-eyes');
  var colorFireball = userDialog.querySelector('.setup-fireball-wrap');
  var inputColorWizardCoat = userDialog.querySelector('input[name="coat-color"]');
  var inputColorWizardEyes = userDialog.querySelector('input[name="eyes-color"]');
  var inputColorFireball = userDialog.querySelector('input[name="fireball-color"]');

  window.colorize.colorize(colorWizardCoat, inputColorWizardCoat, WIZARD_COAT_COLORS);
  window.colorize.colorize(colorWizardEyes, inputColorWizardEyes, WIZARD_EYE_COLORS);
  window.colorize.colorize(colorFireball, inputColorFireball, FIREBALL_COLORS);
})();


