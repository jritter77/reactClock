class Draw {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.background = {};
    this.middleground = {};
    this.foreground = {};

    this.drawId = 0;
  }

  drawLoop() {
    this.clearScreen();

    for (let d in this.background) {
      this.background[d]();
    }

    for (let d in this.middleground) {
      this.middleground[d]();
    }

    for (let d in this.foreground) {
      this.foreground[d]();
    }

    window.requestAnimationFrame(() => this.drawLoop());
  }

  addDrawing(draw, range = this.middleground) {
    range[this.drawId] = draw;
    return this.drawId++;
  }

  removeDrawing(drawId, range = this.middleground) {
    delete range[drawId];
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  line(x1, y1, x2, y2, color = "red") {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  rect(x, y, width, height, color = "red") {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  rectStroke(x, y, width, height, color = "red") {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  circle(x, y, size, color = "red") {
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  circleStroke(x, y, size, color = "red") {
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  poly(x, y, size, sides, angle = 0, color = "red") {
    let spread = (Math.PI * 2) / sides;
    this.ctx.beginPath();
    this.ctx.moveTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
    for (var i = 0; i < sides; i++) {
      this.ctx.lineTo(
        x + size * Math.cos(angle + spread * i),
        y + size * Math.sin(angle + spread * i)
      );
    }
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  text(x, y, str, color = "red", align = "left", style = "16px Arial") {
    this.ctx.font = style;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.fillText(str, x, y);
  }

  textStroke(x, y, str, color = "red", align = "left", style = "16px Arial") {
    this.ctx.font = style;
    this.ctx.strokeStyle = color;
    this.ctx.textAlign = align;
    this.ctx.strokeText(str, x, y);
  }

  multiLineText(
    x,
    y,
    str,
    color = "red",
    align = "left",
    style = "16px Arial"
  ) {
    this.ctx.font = style;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    var lines = str.split("\n");
    var lineHeight = parseInt(style, 10);
    var strHeight = lines.length * lineHeight;
    for (var i = 0; i < lines.length; i++) {
      this.ctx.fillText(
        lines[i],
        x,
        y - strHeight / 2 + lineHeight * i + lineHeight
      );
    }
  }

  getStrWidth(str) {
    var lines = str.split("\n");
    var width = 0;
    for (var i = 0; i < lines.length; i++) {
      if (this.ctx.measureText(lines[i]).width > width) {
        width = this.ctx.measureText(lines[i]).width;
      }
    }
    return width;
  }

  getStrHeight(str) {
    var lines = str.split("\n");
    var lineHeight = parseInt(this.ctx.font, 10);
    return lines.length * lineHeight;
  }
}

export { Draw };
