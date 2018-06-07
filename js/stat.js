'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_RADIUS = 20;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_Y = 240;
var LINE_HEIGHT = 25;

// Функция для отрисовки прямоугольника со скругленными углами (по аналогии с MDN)
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y + CLOUD_RADIUS);
  ctx.lineTo(x, y + CLOUD_HEIGHT - CLOUD_RADIUS);
  ctx.quadraticCurveTo(x, y + CLOUD_HEIGHT, x + CLOUD_RADIUS, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_RADIUS, y + CLOUD_HEIGHT);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH, y + CLOUD_HEIGHT - CLOUD_RADIUS);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_RADIUS);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH - CLOUD_RADIUS, y);
  ctx.lineTo(x + CLOUD_RADIUS, y);
  ctx.quadraticCurveTo(x, y, x, y + CLOUD_RADIUS);
  ctx.fill();
};

// Функция для вычисления максимального времени из массива - через Math.max либо через цикл
var getMaxElement = function (arr) {
  return Math.max.apply(Math, arr);
};

window.renderStatistics = function (ctx, players, times) {
  // Если длина массивов различна, лишние элементы удаляются
  if (players.length > times.length) {
    players.length = times.length;
  }
  if (times.length < players.length) {
    times.length = players.length;
  }

  // Рисуем облако и его тень
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Пишем текст из двух строк
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + LINE_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + LINE_HEIGHT + GAP * 2);

  // Получаем максимальное время из массива times
  var maxTime = getMaxElement(times).toFixed();

  for (var i = 0; i < players.length; i++) {
    // Выбираем цвет для столбца гистограммы
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * (100 - 10) + 10) + '%' + ', 50%)';
    }

    // Вычисляем высоту каждого отдельного столбца гистограммы
    var barHeight = (BAR_MAX_HEIGHT * times[i].toFixed()) / maxTime;

    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, BAR_Y - barHeight, BAR_WIDTH, barHeight);

    // Пишем имена игроков и время прохождения игры
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP);
    ctx.fillText(times[i].toFixed(), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP - barHeight - LINE_HEIGHT);
  }
};
