'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomArrayElement = function (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    getMaxElement: getMaxElement
  };
})();
