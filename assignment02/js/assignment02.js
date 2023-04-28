"use strict";

// Html Elements graphResult
const barGraph = document.getElementById("bar1");
const pieGraph = document.getElementById("pie1");
const tryAgianBtn = document.getElementById("goMain");
const graphChange = document.getElementById("changeBtn");
let isBarGraph = true;

// display button test
graphChange.innerText = "Show Bar Graph";

// set button back to main page
function goMain() {
  window.location.href = "../index.html";
}

// set button chagne result graph type
function switchGraph() {
  if (isBarGraph == true) {
    graphChange.innerText = "Show Pie Graph";
    barGraph.style.display = "block";
    pieGraph.style.display = "none";
    isBarGraph = false;
  } else {
    graphChange.innerText = "Show Bar Graph";
    pieGraph.style.display = "block";
    barGraph.style.display = "none";
    isBarGraph = true;
  }
}
