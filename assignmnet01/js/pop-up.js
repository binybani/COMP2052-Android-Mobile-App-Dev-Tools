// set dealy second
const delayOneSecond = 1000;
const delayTwoSecond = 2000;

//get page elements
const popup = document.getElementById("game-over");
const closePopupWithOkBtn = document.getElementById("btn-close-pop-up");
const finalResultMessege = document.getElementById("final-result");

let needToShowPopup = true;

//hide the popup initially
popup.style.display = "none";

// refresh page and close popup after click x and ok buttons
function makeClosePopup() {
  // when clicking "x" close popup fade out in 3 seconds
  popup.style.animation = "fadeout ease 1s";

  // set popup display none after fade out
  setTimeout(function () {
    popup.style.display = "none";
  }, delayOneSecond);
  refreshPage();
}

//ok button is clicked
closePopupWithOkBtn.addEventListener("click", makeClosePopup);
