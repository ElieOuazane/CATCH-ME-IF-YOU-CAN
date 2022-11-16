const header = document.querySelector("header");
const clickToStart = document.createElement("button");
clickToStart.id = "clickToStart";
clickToStart.innerHTML = `<h1>CLICK TO START</h1>`;
header.append(clickToStart);

const section = document.querySelector("#TheGameScreen");
const theScreenGame = document.createElement("div");
theScreenGame.id = "blackScreen";
const CATCHME = document.createElement("div");
CATCHME.id = "CatchMe";
CATCHME.innerHTML = "CATCH ME &#128539";
section.append(theScreenGame, CATCHME);

const mainDiv = document.querySelector("#Main-div");
const title = document.createElement("h3");
title.id = "highscorestitle";
title.innerText = "HIGH SCROES:";
mainDiv.append(title);

const score = document.getElementById("Score");
const PointToTheNextLevel = document.getElementById("PointToTheNextLevel");
const level = document.getElementById("Level");
const missedClicked = document.getElementById("MissedClicked");

var SCORE = 0;
var POINTTOTHENEXTLEVEL = 10;
var LEVEL = 1;
var MISSEDCLICKED = 0;
var SUCCESSCLICKS = 0;
var SPEEDESCAPEANDROTATION = 0;
var COUNTTIME = 20;

let INFO = [
  {
    Score: SCORE,
    PointToTheNextLevel: POINTTOTHENEXTLEVEL,
    Level: LEVEL,
    MissedClicks: MISSEDCLICKED,
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

clickToStart.addEventListener("click", startTheGame);

function startTheGame() {
  confirm("ARE YOU READY TO START");
  CATCHME.className = "TURNLEVEL1";
  clickToStart.innerHTML = `<h1>CATCH ME IF YOU CAN!</h1>`;
  $("#CatchMe").mouseover(function () {
    setTimeout(() => {
      $(this).css("left", "" + Math.random() * 950 + "px");
      $(this).css("top", "" + Math.random() * 550 + "px");
    }, 300 - SPEEDESCAPEANDROTATION);
  });
  timer = setInterval(function () {
    if (COUNTTIME == 0) {
      COUNTTIME = 20;
      SUCCESSCLICKS = 0;
      SPEEDESCAPEANDROTATION = 0;
      clearInterval(timer);
      CATCHME.className = "CatchMe";
      setTimeout(() => {
        alert(`Your Score is ${SCORE} -- Your Missed Clicks ${MISSEDCLICKED} `);
        $("#CatchMe")
          .css("left", "" + 0 + "px")
          .css("top", "" + 0 + "px");
        CHECKHIGHSCORE();
        clickToStart.innerHTML = `<h1>CLICK TO START</h1>`;
        SCORE = 0;
        POINTTOTHENEXTLEVEL = 10;
        LEVEL = 1;
        MISSEDCLICKED = 0;
        document.getElementById("Score").innerText = SCORE;
        document.getElementById("PointToTheNextLevel").innerText =
          POINTTOTHENEXTLEVEL;
        document.getElementById("Level").innerText = LEVEL;
        document.getElementById("MissedClicked").innerText = MISSEDCLICKED;
      }, 1500);
    }
    $("#Timer").html(COUNTTIME--);
  }, 1000);
  theScreenGame.addEventListener("click", function () {
    MISSEDCLICKED++;
    document.getElementById("MissedClicked").innerText = MISSEDCLICKED;
  });
  CATCHME.addEventListener("click", UPDATEINFO);
}

function UPDATEINFO() {
  POINTTOTHENEXTLEVEL--;
  SUCCESSCLICKS = 10 * LEVEL;
  if (POINTTOTHENEXTLEVEL == 0) {
    TURNTOTHENEXTLEVEL();
  }
  SCORE += SUCCESSCLICKS;
  document.getElementById("Score").innerText = SCORE;
  document.getElementById("PointToTheNextLevel").innerText =
    POINTTOTHENEXTLEVEL;
  document.getElementById("Level").innerText = LEVEL;
  SPEEDESCAPEANDROTATION();
}

function CHECKHIGHSCORE() {
  const element = HIGHSCORE[4].SCORE;
  if (SCORE > element) {
    var NAME = prompt("enter your name please");
    var date = new Date();
    var formats = { year: "numeric", month: "numeric", day: "numeric" };
    var getDATE = date.toLocaleDateString("fr", formats);
    HIGHSCORE[4].SCORE = SCORE;
    HIGHSCORE[4].NAME = NAME;
    HIGHSCORE[4].DATE = getDATE;
    HIGHSCORE.sort((p1, p2) =>
      p1.SCORE > p2.SCORE ? -1 : p1.SCORE < p2.SCORE ? 1 : 0
    );
    localStorage.higeScore = JSON.stringify(HIGHSCORE);
  }
}

function SPEEDESCAPEANDROTATION() {
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
      alert("YOU ARE GANG");
    }, 1000);
  }
}

function TURNTOTHENEXTLEVEL() {
  POINTTOTHENEXTLEVEL = 10;
  LEVEL++;
}

function createHTMLforINFO(INFO) {
  var sections = document.querySelector("#wrapperinfo");
  var div1 = document.createElement("div");
  var div2 = document.createElement("div");
  var div3 = document.createElement("div");
  var div4 = document.createElement("div");
  var div5 = document.createElement("div");
  var titleScore = document.createElement("h3");
  var valueScore = document.createElement("p");
  var titlePointToTheNextLevel = document.createElement("h3");
  var valuetitlePointToTheNextLevel = document.createElement("p");
  var titleLevel = document.createElement("h3");
  var valueLevel = document.createElement("p");
  var titleMissedClicks = document.createElement("h3");
  var valueMissedClicks = document.createElement("p");
  var timerTitle = document.createElement("h3");
  var timerValue = document.createElement("p");
  titleScore.innerText = "SCORE:";
  valueScore.innerText = INFO.Score;
  valueScore.id = "Score";
  titlePointToTheNextLevel.innerText = "POINT TO THE NEXT LEVEL:";
  valuetitlePointToTheNextLevel.innerText = INFO.PointToTheNextLevel;
  valuetitlePointToTheNextLevel.id = "PointToTheNextLevel";
  titleLevel.innerText = "LEVEL:";
  valueLevel.innerText = INFO.Level;
  valueLevel.id = "Level";
  titleMissedClicks.innerText = "MISSED CLICKS:";
  valueMissedClicks.innerText = INFO.MissedClicks;
  valueMissedClicks.id = "MissedClicked";
  timerTitle.innerText = "TIMER:";
  timerValue.innerText = COUNTTIME;
  timerValue.id = "Timer";
  div1.append(titleScore, valueScore);
  div2.append(titlePointToTheNextLevel, valuetitlePointToTheNextLevel);
  div3.append(titleLevel, valueLevel);
  div4.append(titleMissedClicks, valueMissedClicks);
  div5.append(timerTitle, timerValue);
  sections.append(div1, div2, div3, div4, div5);
}

function createHTMLforHigeScore(HIGHSCORE) {
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.className = "highscore";
  p.innerHTML = `<span TITLEpv="${HIGHSCORE.DATE}"> ${HIGHSCORE.NAME} - ${HIGHSCORE.SCORE}</span>`;
  div.append(p);
  mainDiv.append(div);
}
