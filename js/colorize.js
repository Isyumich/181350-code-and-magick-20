'use strict';

(function () {
  var colorize = function (element, inputElement, colorArray) {
    element.addEventListener('click', function () {
      var randomElementColor = window.getRandomArrayElement(colorArray);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = randomElementColor;
      } else {
        element.style.fill = randomElementColor;
      }
      inputElement.value = randomElementColor;
    });
  };

  window.colorize = {
    colorize: colorize
  };
})();
