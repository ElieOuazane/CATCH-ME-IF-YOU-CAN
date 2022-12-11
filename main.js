var SCORE = 0;
var POINTTOTHENEXTLEVEL = 10;
var LEVEL = 1;
var MISSEDCLICKED = 0;
var COUNTTIME = 60;

var GAMEOVER;
var SPEEDESCAPEANDROTATION;
var SUCCESSCLICKS;
var FAKECLICKS;

let INFO = [
  {
    Score: SCORE,
    PointToTheNextLevel: POINTTOTHENEXTLEVEL,
    Level: LEVEL,
    MissedClicks: MISSEDCLICKED,
    timer: COUNTTIME,
  },
];

let HIGHSCORE = [
  {
    NAME: "elieouazane",
    SCORE: 50,
    DATE: "15/11/2022",
  },
  {
    NAME: "elieouazane",
    SCORE: 100,
    DATE: "10/10/2022",
  },
  {
    NAME: "elieouazane",
    SCORE: 200,
    DATE: "09/09/2022",
  },
  {
    NAME: "elieouazane",
    SCORE: 400,
    DATE: "08/08/2022",
  },
  {
    NAME: "elieouazane",
    SCORE: 40,
    DATE: "08/08/2022",
  },
];

const header = document.getElementById("header-content");
const CLICKTOSTART = document.createElement("button");
CLICKTOSTART.id = "clickToStart";
CLICKTOSTART.innerHTML = `<h1>CLICK TO START</h1>`;
header.append(CLICKTOSTART);

const MAIN = document.getElementById("main-content");
const THEGAMESCREEN = document.createElement("div");
THEGAMESCREEN.id = "blackScreen";
const CATCHME = document.createElement("div");
CATCHME.id = "CatchMe";
CATCHME.innerHTML = "<div>CATCH ME &#128539<div>";
MAIN.append(CATCHME, THEGAMESCREEN);

var sections = document.getElementById("info");

const mainDiv = document.getElementById("high-scores");
const title = document.createElement("div");
title.id = "highscorestitle";
title.innerText = "HIGH SCROES";
mainDiv.append(title);

const score = document.getElementById("Score");
const PointToTheNextLevel = document.getElementById("PointToTheNextLevel");
const level = document.getElementById("Level");
const missedClicked = document.getElementById("MissedClicked");

let highScoreJson = localStorage.higeScore;
if (highScoreJson) {
  HIGHSCORE = JSON.parse(highScoreJson);
} else {
  HIGHSCORE.sort((p1, p2) =>
    p1.SCORE > p2.SCORE ? -1 : p1.SCORE < p2.SCORE ? 1 : 0
  );
  localStorage.higeScore = JSON.stringify(HIGHSCORE);
}

INFO.forEach(createHTMLforINFO);

HIGHSCORE.forEach(createHTMLforHigeScore);

CLICKTOSTART.addEventListener("click", startTheGame);

function createHTMLforINFO(INFO) {
  INFO.DOM = {};
  const $ = INFO.DOM;
  $.div1 = document.createElement("div");
  $.div2 = document.createElement("div");
  $.div3 = document.createElement("div");
  $.div4 = document.createElement("div");
  $.div5 = document.createElement("div");
  $.titleScore = document.createElement("h3");
  $.valueScore = document.createElement("p");
  $.titlePointToTheNextLevel = document.createElement("h3");
  $.valuetitlePointToTheNextLevel = document.createElement("p");
  $.titleLevel = document.createElement("h3");
  $.valueLevel = document.createElement("p");
  $.titleMissedClicks = document.createElement("h3");
  $.valueMissedClicks = document.createElement("p");
  $.timerTitle = document.createElement("h3");
  $.timerValue = document.createElement("p");
  $.titleScore.innerText = "SCORE:";
  $.valueScore.innerText = INFO.Score;
  $.valueScore.id = "Score";
  $.titlePointToTheNextLevel.innerText = "POINT TO THE NEXT LEVEL:";
  $.valuetitlePointToTheNextLevel.innerText = INFO.PointToTheNextLevel;
  $.valuetitlePointToTheNextLevel.id = "PointToTheNextLevel";
  $.titleLevel.innerText = "LEVEL:";
  $.valueLevel.innerText = INFO.Level;
  $.valueLevel.id = "Level";
  $.titleMissedClicks.innerText = "MISSED CLICKS:";
  $.valueMissedClicks.innerText = INFO.MissedClicks;
  $.valueMissedClicks.id = "MissedClicked";
  $.timerTitle.innerText = "TIMER:";
  $.timerValue.innerText = INFO.timer;
  $.timerValue.id = "Timer";
  $.div1.append($.titleScore, $.valueScore);
  $.div2.append($.titlePointToTheNextLevel, $.valuetitlePointToTheNextLevel);
  $.div3.append($.titleLevel, $.valueLevel);
  $.div4.append($.titleMissedClicks, $.valueMissedClicks);
  $.div5.append($.timerTitle, $.timerValue);
  sections.append($.div1, $.div2, $.div3, $.div4, $.div5);
}

function createHTMLforHigeScore(HIGHSCORE) {
  HIGHSCORE.DOM = {};
  const $ = HIGHSCORE.DOM;
  $.div = document.createElement("div");
  $.p = document.createElement("p");
  $.p.className = "highscore";
  $.p.innerHTML = `<span TITLEpv="${HIGHSCORE.DATE}"> ${HIGHSCORE.NAME} - <p>${HIGHSCORE.SCORE}<p></span>`;
  $.div.append($.p);
  mainDiv.append($.div);
}

function CHECKHIGHSCORE() {
  const element = HIGHSCORE[4].SCORE;
  if (SCORE > element) {
    swal("enter your name please:", {
      content: "input",
    }).then((NAME) => {
      var date = new Date();
      var formats = { year: "numeric", month: "numeric", day: "numeric" };
      var getDATE = date.toLocaleDateString("fr", formats);
      HIGHSCORE[4].SCORE = SCORE;
      HIGHSCORE[4].NAME = NAME;
      HIGHSCORE[4].DATE = getDATE;
      // מסדר את המערך בסדר יורד
      HIGHSCORE.sort((p1, p2) =>
        p1.SCORE > p2.SCORE ? -1 : p1.SCORE < p2.SCORE ? 1 : 0
      );
      ///מעדכו ישר בלי רפרוש
      HIGHSCORE[4][
        "DOM"
      ].p.innerHTML = `<span TITLEpv="${getDATE}"> ${NAME} - <p>${SCORE}</p></span>`;

      localStorage.higeScore = JSON.stringify(HIGHSCORE);
      swal(
        `NAME: ${NAME}. - SCORE: ${SCORE}. - DATE: ${getDATE}. - MISSED CLICKED: ${MISSEDCLICKED}.`
      );
      setTimeout(() => {
        restartTheGame();
      }, 1500);
    });
    // var NAME = prompt("enter your name please");
  } else {
    swal(`SCORE: ${SCORE}. - MISSED CLICKED: ${MISSEDCLICKED}.`);
    restartTheGame();
  }
}

function startTheGame() {
  swal({
    title: "ARE YOU READY TO START?",
    text: "Click ok to start the game!",
    buttons: true,
    dangerMode: true,
  }).then((READY) => {
    if (READY == true) {
      GAMEOVER = false;
      SPEEDESCAPEANDROTATION = 0;
      SUCCESSCLICKS = 0;
      FAKECLICKS = 0;

      CATCHME.className = "TURNLEVEL1";
      CLICKTOSTART.innerHTML = `<h1>CATCH ME IF YOU CAN!</h1>`;

      THEGAMESCREEN.addEventListener("click", UPDATEFAKECLICKS);

      CATCHME.addEventListener("click", UPDATEINFO);

      $("#CatchMe").mouseover(function () {
        if (GAMEOVER == false) {
          setTimeout(() => {
            $(this).css("left", "" + Math.random() * 950 + "px");
            $(this).css("top", "" + Math.random() * 550 + "px");
          }, 300 - SPEEDESCAPEANDROTATION);
        }
      });

      var timer = setInterval(function () {
        if (COUNTTIME == 0) {
          clearInterval(timer);
          CATCHME.className = "CatchMe";
          CLICKTOSTART.innerHTML = `<h1>CLICK TO START</h1>`;
          GAMEOVER = true;
          $("#CatchMe")
            .css("left", "" + 0 + "px")
            .css("top", "" + 0 + "px");
          setTimeout(() => {
            CHECKHIGHSCORE();
          }, 1500);
        }
        INFO[0]["DOM"].timerValue.innerText = COUNTTIME--;
      }, 1000);
    } else {
      swal("come back when your READY!");
    }
  });
  // var start = confirm("ARE YOU READY TO START");
}

function restartTheGame() {
  SCORE = 0;
  POINTTOTHENEXTLEVEL = 10;
  LEVEL = 1;
  MISSEDCLICKED = 0;
  COUNTTIME = 60;

  INFO[0]["DOM"].valueScore.innerText = SCORE;
  INFO[0]["DOM"].valuetitlePointToTheNextLevel.innerText = POINTTOTHENEXTLEVEL;
  INFO[0]["DOM"].valueLevel.innerText = LEVEL;
  INFO[0]["DOM"].valueMissedClicks.innerText = MISSEDCLICKED;
  INFO[0]["DOM"].timerValue.innerText = COUNTTIME;
}

function SPEEDESCAPEANDROTATIONE() {
  if (LEVEL == 2) {
    CATCHME.className = "TURNLEVEL2";
    SPEEDESCAPEANDROTATION += 50;
  } else if (LEVEL == 3) {
    CATCHME.className = "TURNLEVEL3";
    SPEEDESCAPEANDROTATION += 50;
  } else if (LEVEL == 4) {
    CATCHME.className = "TURNLEVEL4";
    SPEEDESCAPEANDROTATION += 50;
  } else if (LEVEL == 5) {
    CATCHME.className = "TURNLEVEL5";
    SPEEDESCAPEANDROTATION += 50;
  } else if (LEVEL == 6) {
    CATCHME.className = "CatchMe";
    clearInterval(timer);
    setTimeout(() => {
      swal("YOU ARE GANG");
    }, 1000);
  }
}

function TURNTOTHENEXTLEVEL() {
  POINTTOTHENEXTLEVEL = 10;
  LEVEL++;
  SPEEDESCAPEANDROTATIONE();
}

function UPDATEINFO() {
  if (GAMEOVER == false) {
    POINTTOTHENEXTLEVEL--;
    SUCCESSCLICKS = 10 * LEVEL;
    if (POINTTOTHENEXTLEVEL == 0) {
      TURNTOTHENEXTLEVEL();
    }
    SCORE += SUCCESSCLICKS;
    INFO[0]["DOM"].valueScore.innerText = SCORE;
    INFO[0]["DOM"].valuetitlePointToTheNextLevel.innerText =
      POINTTOTHENEXTLEVEL;
    INFO[0]["DOM"].valueLevel.innerText = LEVEL;
  }
}

function UPDATEFAKECLICKS() {
  if (GAMEOVER == false) {
    MISSEDCLICKED++;
    INFO[0]["DOM"].valueMissedClicks.innerText = MISSEDCLICKED;
    FAKECLICKS = 10 * LEVEL;
    SCORE -= FAKECLICKS;
    INFO[0]["DOM"].valueScore.innerText = SCORE;
  }
}
