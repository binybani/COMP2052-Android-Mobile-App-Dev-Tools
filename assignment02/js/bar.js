"use strict";

class BarChart {
  constructor(divId, data) {
    let totalSpaces = data.length * 3 + 1;
    let spaceWidth = 200 / totalSpaces;

    let svg = '<svg style="display:block" xmlns="http://www.w3.org/2000/svg" ';
    svg += 'viewBox="0 0 200 200">';
    svg += "<style>.txt3 {";
    svg += "font: bold " + spaceWidth + "px sans-serif;";
    svg += "fill: #fff;";
    svg += "stroke-width: " + spaceWidth * 0.02 + "pt;";
    svg += "stroke: #777;";
    svg += "dominant-baseline: central;";
    svg += "text-anchor: middle;";
    svg += "}</style>";

    let incrementFactor = 200 / Math.max.apply(Math, data);
    for (let i in data) {
      svg += this.drawBar(i, data[i], spaceWidth, incrementFactor * data[i]);
    }
    svg += "</svg>";
    document.getElementById(divId).innerHTML = svg;
  }

  drawBar(i, data, space, h) {
    let x = i * space * 3 + space;
    let path =
      '<rect fill="' +
      this.randomColour() +
      '" x="' +
      x +
      '" y="' +
      (200 - h) +
      '" width="' +
      space * 2 +
      '" height="' +
      h +
      '" />';
    let txt =
      '<text class="txt3" x="' +
      (x + space) +
      '" y="' +
      (200 - space) +
      '">' +
      data +
      "</text>";
    return path + txt;
  }

  randomColour() {
    return (
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).slice(1, 7)
    );
  }
}
