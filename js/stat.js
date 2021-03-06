'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var ELEMENT_WIDTH = 40;
  var ELEMENT_GAP = 50;
  var MAX_ELEMENT_HEIGHT = 150;


  // Функция создания облака
  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  // Функция получения статистики игроков
  var getPlayersStatistic = function (ctx, players, times) {
    var maxTime = window.util.getMaxElement(times);

    for (var i = 0; i < times.length; i++) {
      var blueColor = window.util.getRandomNumber(0, 100);
      ctx.fillStyle = (players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + blueColor + '%, 50%)');
      var elementHeight = times[i] * MAX_ELEMENT_HEIGHT / maxTime;
      ctx.fillText(players[i], CLOUD_X + 40 + (ELEMENT_WIDTH + ELEMENT_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - 20);
      ctx.fillRect(CLOUD_X + 40 + (ELEMENT_WIDTH + ELEMENT_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - 30, ELEMENT_WIDTH, -elementHeight);
      ctx.fillText(String(Math.round(times[i])), CLOUD_X + 40 + (ELEMENT_WIDTH + ELEMENT_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - elementHeight - 50);
    }
  };

  // Функция отрисовки статистики игры
  var renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = '#000';
    ctx.fillText('Ура вы победили!', CLOUD_X + 20, CLOUD_Y + 20);
    ctx.fillText('Список результатов:', CLOUD_X + 20, CLOUD_Y + 40);

    getPlayersStatistic(ctx, players, times);
  };

  window.stat = {
    renderStatistics: renderStatistics
  };
})();

