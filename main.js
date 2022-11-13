const clickToStart = document.getElementById("clickToStart");
var CATCHME = document.getElementById("CatchMe");
const score = document.getElementById("Score");
const PointToTheNextLevel = document.getElementById("PointToTheNextLevel");
const level = document.getElementById("Level");
const theScreenGame = document.getElementById("blackScreen");
const missedClicked = document.getElementById("MissedClicked");

var SCORE = 0; //שווה את עצמו פלוס הרמה
var POINTTOTHENEXTLEVEL = 10; //שווה את score -
var LEVEL = 1; // אם מגיע ל0 הרמה מוסיפה 1
var MISSEDCLICKED = 0;
var SUCCESSCLICKS = LEVEL * 10;
var EXTRATIME = 0;
var ESCAPESPEEDFOREACHLEVEL = 10;

clickToStart.addEventListener("click", function () {
  clickToStart.innerHTML = `<h1>CATCH ME IF YOU CAN!</h1>`;
  CATCHME.className = "TURNLEVEL1";
  confirm("ARE YOU READY TO START");
  $("#CatchMe").mouseover(function () {
    setTimeout(() => {
      $(this).css("left", "" + Math.random() * 600 + "px");
      $(this).css("top", "" + Math.random() * 300 + "px");
    }, 310 - ESCAPESPEEDFOREACHLEVEL);
  });
  var count = 60;
  timer = setInterval(function () {
    if (count == 0) {
      clearInterval(timer);
      CATCHME.className = "CatchMe";
      MISSEDCLICKED = 0;
      POINTTOTHENEXTLEVEL = 10;
      SCORE = 0;
      LEVEL = 1;
      score.innerText = SCORE;
      level.innerText = LEVEL;
      PointToTheNextLevel.innerText = POINTTOTHENEXTLEVEL;
      missedClicked.innerText = MISSEDCLICKED;
      
      setTimeout(() => {
        alert("YOU LOSE");
        $("#CatchMe")
        .css("left", "" + 0 + "px")
        .css("top", "" + 0   + "px");
      }, 1000);
   
    }
    $("#Timer").html(count--);
  }, 1000);
  theScreenGame.addEventListener("click", function () {
    MISSEDCLICKED++;
    missedClicked.innerText = MISSEDCLICKED;
    if (MISSEDCLICKED == 10) {
      MISSEDCLICKED = 0;
    }
  });

  CATCHME.addEventListener("click", function () {
    SCORE = SCORE + SUCCESSCLICKS;
    POINTTOTHENEXTLEVEL = POINTTOTHENEXTLEVEL - 1;
    score.innerText = SCORE;
    PointToTheNextLevel.innerText = POINTTOTHENEXTLEVEL;
    level.innerText = LEVEL;

    if (POINTTOTHENEXTLEVEL == 0) {
      count += 10;
      LEVEL++;
      POINTTOTHENEXTLEVEL = 10;
      MISSEDCLICKED = 0;
      PointToTheNextLevel.innerText = POINTTOTHENEXTLEVEL;
      level.innerText = LEVEL;
      missedClicked.innerText = MISSEDCLICKED;

      if (LEVEL == 2) {
        CATCHME.className = "TURNLEVEL2";
        ESCAPESPEEDFOREACHLEVEL =
          ESCAPESPEEDFOREACHLEVEL * ESCAPESPEEDFOREACHLEVEL;
      } else if (LEVEL == 3) {
        CATCHME.className = "TURNLEVEL3";
        ESCAPESPEEDFOREACHLEVEL =
          ESCAPESPEEDFOREACHLEVEL * ESCAPESPEEDFOREACHLEVEL;
      } else if (LEVEL == 4) {
        CATCHME.className = "TURNLEVEL4";
        ESCAPESPEEDFOREACHLEVEL =
          ESCAPESPEEDFOREACHLEVEL * ESCAPESPEEDFOREACHLEVEL;
      } else if (LEVEL == 5) {
        CATCHME.className = "TURNLEVEL5";
        ESCAPESPEEDFOREACHLEVEL =
          ESCAPESPEEDFOREACHLEVEL * ESCAPESPEEDFOREACHLEVEL;
      } else if (LEVEL == 6) {
        CATCHME.className = "CatchMe";
        SCORE = 0;
        LEVEL = 1;
        count = 0;
        score.innerText = SCORE;
        level.innerText = LEVEL;
        clickToStart.innerHTML = "";
        clearInterval(timer);
        setTimeout(() => {
          alert("YOU WIN");
        }, 1000);
      }
    }
  });
});
