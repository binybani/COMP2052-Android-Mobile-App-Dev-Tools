class Player {
  constructor(name, totalScore, isWin) {
    this.name = name;
    this.totalScore = totalScore;
    this.isWin = isWin;
  }
  describeSelf() {
    let returnString = `<p> Your total score is ${this.totalScore}.</p>`;
    if (this.isWin === 1) {
      returnString += `<p>Congrats!! You Win!</p>`;
    } else if (this.isWin === 0) {
      returnString += `<p>Try agian.. You lose..</p>`;
    } else {
      returnString += `<p>End in a tie. Try again!</p>`;
    }
    return returnString;
  }
}

//get page elements
const buttonField = document.getElementById("btn_fieldset");
const compScoreRound = document.getElementById("comp-score-round");
const compTotalRound = document.getElementById("comp-total-round");
const userScoreRound = document.getElementById("user-score-round");
const userTotalRound = document.getElementById("user-total-round");
const catsEyes = document.getElementById("cats-eyes");
const catsPaw = document.getElementById("cats-paw");

// set dice total side
const diceSide = 6;

// set 0 point dice side
const giveZero = 1;

// roll dice
function dice(num) {
  let randomNum = Math.floor(num * Math.random()) + 1;
  return randomNum;
}

// init each point
let playerPoint = 0;
let compTotalPoint = 0;
let userTotalPoint = 0;

// number of multiple bonuus
const bonusPoint = 2;

// calculate dice result point
function diceResult(die1, die2) {
  if (die1 > giveZero && die2 > giveZero) {
    playerPoint = die1 + die2;
    if (die1 == die2) {
      playerPoint = (die1 + die2) * bonusPoint;
    }
  } else if (die1 == giveZero || die2 == giveZero) {
    playerPoint = 0;
  }
  return playerPoint;
}

// 0 == user lose, 1 == user win, 2 == tie score
function finalResult(compTotalScore, userTotalScore) {
  if (compTotalScore > userTotalScore) {
    isWin = 0;
    catsEyes.src = `img/eye-close.png`;
    catsEyes.className = `blink`;
    setTimeout(function () {
      catsPaw.classList.remove(`blink`);
      catsPaw.style.display = "none";
    }, delayOneSecond);
  } else if (compTotalScore < userTotalScore) {
    isWin = 1;
    catsPaw.src = `img/paw.png`;
    catsPaw.className = `blink`;
    catsPaw.style.display = "block";
    setTimeout(function () {
      catsEyes.classList.remove(`blink`);
      catsEyes.src = `img/eye-open.png`;
    }, delayOneSecond);
  } else {
    isWin = 2;
    catsPaw.src = `img/paw.png`;
    catsPaw.className = `blink`;
    catsPaw.style.display = "block";
    catsEyes.src = `img/eye-close.png`;
    catsEyes.className = `blink`;
  }
  const user = new Player("User", userTotalPoint, isWin);
  finalResultMessege.innerHTML = user.describeSelf();
}

// refresh page
function refreshPage() {
  window.location.reload();
}

// change loser's image
function changeLoserImg(compScore, userScore) {
  if (compScore > userScore) {
    setTimeout(function () {
      catsEyes.src = `img/eye-close.png`;
      catsEyes.className = `blink`;
    }, delayOneSecond);
    catsPaw.classList.remove(`blink`);
    catsPaw.style.display = "none";
  } else if (compScore < userScore) {
    setTimeout(function () {
      catsPaw.className = `blink`;
      catsPaw.style.display = "block";
    }, delayOneSecond);
    catsEyes.src = `img/eye-open.png`;
    catsEyes.classList.remove(`blink`);
  }
}

// init each palyer dice result
let compDie1 = 0;
let compDie2 = 0;
let userDie1 = 0;
let userDie2 = 0;

//create a boolean flag to track
let keepSpining = false;

// maximum number of roll the dice
const maxNumOfRollDice = 3;
let currentNumOfRollDice = 0;

// roll dice and new game
const btnRollDice = document.getElementById("btn-roll-dice");
const btnNewGame = document.getElementById("btn-new-game");

// each player dice
const compDiceImageInHTML1 = document.getElementById("compDice1");
const compDiceImageInHTML2 = document.getElementById("compDice2");
const userDiceImageInHTML1 = document.getElementById("userDice1");
const userDiceImageInHTML2 = document.getElementById("userDice2");

//need an animation handler
let diceAnimationHandler;
let timeoutHandler;

//the first image # in the group
let currentImageNumber = 1;
//the last image # in the group
const maxImageNumber = 6;

// roll dice button is clicked
btnRollDice.addEventListener("click", function () {
  //see if the animation has alread been started
  if (currentNumOfRollDice < maxNumOfRollDice) {
    keepSpining = true;
    //request a frame of animation
    diceAnimationHandler = requestAnimationFrame(spinImage);

    currentNumOfRollDice++;

    // roll each dice
    compDie1 = dice(diceSide);
    compDie2 = dice(diceSide);
    userDie1 = dice(diceSide);
    userDie2 = dice(diceSide);

    // calculate every round point
    let compPoint = diceResult(compDie1, compDie2);
    let userPoint = diceResult(userDie1, userDie2);

    // calculate total points
    compTotalPoint += compPoint;
    userTotalPoint += userPoint;

    changeLoserImg(compPoint, userPoint);

    // set timer for dislpay point
    setTimeout(function () {
      compScoreRound.innerHTML = compPoint;
      userScoreRound.innerHTML = userPoint;
      compTotalRound.innerHTML = compTotalPoint;
      userTotalRound.innerHTML = userTotalPoint;
    }, delayOneSecond);

    // show popup when the game ended
    if (currentNumOfRollDice == maxNumOfRollDice) {
      setTimeout(function () {
        popup.style.display = "block";
        finalResult(compTotalPoint, userTotalPoint);
      }, delayTwoSecond);
      btnRollDice.disabled = true;
    }
  }

  // change dice image with dice point
  setTimeout(function () {
    clearTimeout(timeoutHandler);
    cancelAnimationFrame(diceAnimationHandler);
    userHasNotStartedAnimationYet = true;
    compDiceImageInHTML1.src = `img/dice-${compDie1}.png`;
    compDiceImageInHTML2.src = `img/dice-${compDie2}.png`;
    userDiceImageInHTML1.src = `img/dice-${userDie1}.png`;
    userDiceImageInHTML2.src = `img/dice-${userDie2}.png`;
  }, delayOneSecond);
});

//new game button is clicked
btnNewGame.addEventListener("click", function () {
  refreshPage();
  userHasNotStartedAnimationYet = true;
});

/*
run this with each frame of animation
*/
function spinImage() {
  //determine the next image
  currentImageNumber++;
  //if end of images, start again
  if (currentImageNumber > maxImageNumber) {
    currentImageNumber = 1;
  }
  //update image
  compDiceImageInHTML1.src = `img/dice-${currentImageNumber}.png`;
  compDiceImageInHTML2.src = `img/dice-${currentImageNumber}.png`;
  userDiceImageInHTML1.src = `img/dice-${currentImageNumber}.png`;
  userDiceImageInHTML2.src = `img/dice-${currentImageNumber}.png`;
  //pause in between each frame of animation
  timeoutHandler = setTimeout(function () {
    //callback for the next frame of animation
    diceAnimationHandler = requestAnimationFrame(spinImage);
  }, 100);
}
