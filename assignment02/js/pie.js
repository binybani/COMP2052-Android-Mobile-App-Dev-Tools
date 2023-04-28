"use strict";

class Pie {
  constructor(divId, data, radius = 90) {
    this.div = document.getElementById(divId);
    this.data = data;
    this.radius = radius;
    this.angles = [];
    this.closure = "</g></svg>";

    let svg = '<svg style="display:block" ';
    svg += 'xmlns="http://www.w3.org/2000/svg" ';
    svg += 'viewBox="0 0 200 200">';
    svg += this.getStyle();
    svg += '<g transform="translate(100, 100)">';

    let total = data.reduce((a, b) => a + b, 0);
    let fromAngle = 0;
    for (let i in data) {
      let toAngle = fromAngle + (data[i] / total) * Math.PI * 2;
      svg += this.drawSector(fromAngle, toAngle);
      fromAngle = toAngle;
    }
    svg += this.closure;
    this.div.innerHTML = svg;
  }

  getStyle() {
    return "";
  }

  drawSector(fromAngle, toAngle) {
    this.angles.push((fromAngle + toAngle) / 2);
    let pathData = [
      "M",
      0,
      0,
      "L",
      this.radius * Math.cos(fromAngle),
      this.radius * Math.sin(fromAngle),
      "A",
      this.radius,
      this.radius,
      0,
      toAngle - fromAngle > Math.PI ? 1 : 0,
      1,
      this.radius * Math.cos(toAngle),
      this.radius * Math.sin(toAngle),
      "Z",
    ].join(" ");
    return '<path d="' + pathData + '" fill="' + this.randomColour() + '"/>';
  }

  randomColour() {
    return (
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).slice(1, 7)
    );
  }
}

class PieWithData extends Pie {
  constructor(divId, data, radius = 90) {
    super(divId, data, radius);
    this.addInfo();
  }

  addInfo() {
    this.addText(0.8, this.data);
  }

  getStyle() {
    let style = "<style>." + this.constructor.name + " {";
    style += "font: bold " + this.radius * 0.12 + "px sans-serif;";
    style += "fill: #4e5283;";
    style += "stroke-width: " + this.radius * 0.003 + "pt;";
    style += "stroke: #ffffff;";
    style += "dominant-baseline: central;";
    style += "text-anchor: middle;";
    style += "}</style>";
    return style;
  }

  addText(scaleFactor, arr) {
    let addedText;
    for (let i in arr) {
      if (this.data[i] == 0) {
        continue;
      }
      addedText +=
        '<text class="' +
        this.constructor.name +
        '" x="' +
        this.radius * scaleFactor * Math.cos(this.angles[i]) +
        '" y="' +
        this.radius * scaleFactor * Math.sin(this.angles[i]) +
        '">' +
        arr[i] +
        "</text>";
    }
    let svg = this.div.innerHTML;
    this.div.innerHTML = svg.replace(this.closure, addedText + this.closure);
  }
}

class PieWithLabels extends PieWithData {
  constructor(divId, data, labels, radius = 70) {
    super(divId, data, radius);
    this.labels = labels;
    this.addInfo();
  }

  addInfo() {
    this.addText(0.6, this.data);
    this.addText(1.1, this.labels);
  }
}
