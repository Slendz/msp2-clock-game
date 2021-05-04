var currentNum = 1;
var score = 0;
var currentHour = 0;
var currentMin = 0;
var selectedAnswer = 0;
var correctAnswer = 0;

function initialGame() {
  currentNum = 1;
  score = 0;
  currentHour = 0;
  currentMin = 0;
  selectedAnswer = 0;
  correctAnswer = 0;
}

function endGame() {
  initialGame();
  var mainPanel = document.getElementById("mainPanel");
  var gamePanel = document.getElementById("gamePanel");
  gamePanel.className += " hidden";
  mainPanel.className = mainPanel.className.replace("hidden", "");
  $('.close-modal').click();
}

function restart(){
  initialGame();
  start();
  $('.close-modal').click();
}

function setAnswer(val) {
  selectedAnswer = val;
}

function start() {
  var mainPanel = document.getElementById("mainPanel");
  var gamePanel = document.getElementById("gamePanel");
  var hours = Math.floor(Math.random() * 12) + 1;
  var minutes = Math.floor(Math.random() * 12) + 1;

  currentHour = hours;
  currentMin = minutes * 5;
  document.getElementById("score").innerHTML = score;
  document.getElementById("currentNum").innerHTML = currentNum;
  updateClock(hours, minutes * 5);
  makeAnswerBtn(hours, minutes * 5);
  mainPanel.className += " hidden";
  gamePanel.className = gamePanel.className.replace("hidden", "");
  
}

function updateClock(hours, minutes) {

  var hourDegrees = hours * 30;
  var minuteDegrees = minutes * 6;
  hourDegrees += (360 / 12 / 60) * minutes;
  $('.hour-hand').css({
    'transform': `rotate(${hourDegrees}deg)`
  });

  $('.minute-hand').css({
    'transform': `rotate(${minuteDegrees}deg)`
  });

}

function makeAnswerBtn(hr, min) {
  var ansBtn = "";
  if (min == 60) {
    min = 0;
    hr++;
  }
  const rbs = document.querySelectorAll('input[name="budget"]');
  for (const rb of rbs) {
    rb.checked = false;
  }
  var cHours = hr < 10 ? "0" + hr : hr;
  var cMinutes = min < 10 ? "0" + min : min;
  var secCorrectAnswer = Math.floor(Math.random() * 4) + 1;
  correctAnswer = secCorrectAnswer;
  for (var i = 1; i <= 4; i++) {
    ansBtn = document.getElementById("budget-" + i + "-span");
    if (secCorrectAnswer == i) {
      ansBtn.innerHTML = cHours + " : " + cMinutes;
      ansBtn.setAttribute("data-hover", cHours + " : " + cMinutes);
    } else {
      var hours = Math.floor(Math.random() * 12) + 1;
      var minutes = Math.floor(Math.random() * 12) + 1;
      minutes = minutes * 5;
      ansBtn.innerHTML = hours + " : " + minutes;
      ansBtn.setAttribute("data-hover", hours + " : " + minutes);
    }
  }
}

function animateValue(obj, start, end, duration) {
  startTimestamp = null;
  const  step = (timestamp) => {
  if (!startTimestamp) startTimestamp = timestamp;
  const progress = Math.min((timestamp - startTimestamp) / duration, 1);
  obj.innerHTML = Math.floor(progress * (end - start) + start);
  if (progress < 1) {
    window.requestAnimationFrame(step);
  }
};
window.requestAnimationFrame(step);
}

function checkGame() {
  if (!selectedAnswer) {
    alert("please select one answer");
  } else {
    if (correctAnswer == selectedAnswer) {
      toggleAlert();
      document.getElementById("alertImage").src = "asset/images/clock/correct.png";
      score += 10;
      setTimeout(() => {
        makeQuestion('correct');
      }, 2000)
    } else {
      toggleAlert();
      document.getElementById("alertImage").src = "asset/images/clock/incorrect.png";
      setTimeout(() => {
        makeQuestion('incorrect');
      }, 2000)
    }
  }

}

function toggleAlert() {
  $("#toggle-btn").click();
  setTimeout(() => {
    $('#overlay-close').click();
  }, 2000)
}

function makeQuestion(resultFlag) {
  selectedAnswer = 0;
  correctAnswer = 0;

  currentNum++;
  if(currentNum == 11){
    $('.open-modal').click();

    var element = document.getElementById("result");
    var startValue = score > 0 ? score - 10 : score;
    var endValue = score;
    if(endValue < 50) {
      document.getElementById("result-title").innerHTML = "Ops! Learn more Clock";
    } else {
      document.getElementById("result-title").innerHTML = "Congratulation!";
    }
    setTimeout(()=>{
      animateValue(element, startValue, endValue, 800);
    }, 400);
    return false;
  }

  var curNumEl = document.getElementById("currentNum");
  var scoreEl = document.getElementById("score");
  curNumEl.innerHTML = currentNum;
  // const obj = document.getElementById("value");
  var startValue = score > 0 ? score - 10 : score;
  var endValue = score;
  if(resultFlag == 'correct'){
    animateValue(scoreEl, startValue, endValue, 800);
  }
  
  // scoreEl.innerHTML = score;
  var hours = Math.floor(Math.random() * 12) + 1;
  var minutes = Math.floor(Math.random() * 12) + 1;

  currentHour = hours;
  currentMin = minutes * 5;

  updateClock(hours, minutes * 5);
  makeAnswerBtn(hours, minutes * 5);

}

function openModalBox() {
  var modal = $('.modal, #mask');
  $('.open-modal').on('click', function () {
    modal.fadeIn(300);
  });
  $('.close-modal').on('click', function () {
    modal.fadeOut(800);
  });
}

$(document).ready(function () {

  var hours = Math.floor(Math.random() * 12) + 1;
  var minutes = Math.floor(Math.random() * 12) + 1;

  currentHour = hours;
  currentMin = minutes * 5;

  updateClock(hours, minutes * 5);
  makeAnswerBtn(hours, minutes * 5);

  $(function () {
    var $overlay = $('.overlay'),
      $overlayTrigger = $('.overlay-trigger button'),
      $overlayClose = $('#overlay-close'),
      openClass = 'is-open';

    $overlayTrigger.on('click', function () {
      var num = ('0' + ($(this).index() + 1)).slice(-2);
      $('.overlay' + num).addClass(openClass);
      $overlayClose.addClass(openClass);
    });

    $overlayClose.on('click', function () {
      $overlayClose.removeClass(openClass);
      $overlay.removeClass(openClass);
    });
  });
  openModalBox();
})


