import { Canvas } from "./Canvas";
import { useEffect, useState } from "react";
import { Draw } from "./Draw";

const Clock = () => {
  const [ctx, setCtx] = useState(null);
  let date = new Date();
  let draw;
  const canvasWidth = "480";
  const canvasHeight = "480";
  const clock_bg = require("./clock_background.png");

  useEffect(() => {
    if (ctx) {
      draw = new Draw(ctx, canvasWidth, canvasHeight);

      updateTime();
    }
  });

  return (
    <div>
      <Canvas
        height={canvasHeight}
        width={canvasWidth}
        style={{ background: "none" }}
        setCtx={setCtx}
      ></Canvas>
      <img
        id="clock_background"
        src={clock_bg}
        style={{ display: "none" }}
      ></img>
    </div>
  );

  function updateTime() {
    date = new Date();
    //console.log(date.getHours(), date.getMinutes(), date.getSeconds());
    drawClock();
    requestAnimationFrame(updateTime);
  }

  function drawHand(width, length, angle, color = "red") {
    draw.ctx.beginPath();
    draw.ctx.moveTo(
      canvasWidth / 2 + width * Math.cos(angle - Math.PI / 2),
      canvasHeight / 2 + width * Math.sin(angle - Math.PI / 2)
    );
    draw.ctx.lineTo(
      canvasWidth / 2 + length * Math.cos(angle),
      canvasHeight / 2 + length * Math.sin(angle)
    );
    draw.ctx.lineTo(
      canvasWidth / 2 + width * Math.cos(angle + Math.PI / 2),
      canvasHeight / 2 + width * Math.sin(angle + Math.PI / 2)
    );
    draw.ctx.fillStyle = color;
    draw.ctx.fill();
    draw.ctx.closePath();
  }

  function drawSecondHand() {
    let width = 4;
    let length = canvasWidth / 3;
    let angle = (date.getSeconds() * Math.PI * 2) / 60 - Math.PI / 2;

    drawHand(width, length, angle);
  }

  function drawMinuteHand() {
    let width = 6;
    let length = canvasWidth / 3;
    let angle = (date.getMinutes() * Math.PI * 2) / 60 - Math.PI / 2;

    drawHand(width, length, angle, "white");
  }

  function drawHourHand() {
    let width = 6;
    let length = canvasWidth / 4;
    let angle = (date.getHours() * Math.PI * 2) / 12 - Math.PI / 2;

    drawHand(width, length, angle, "white");
  }

  function drawClock() {
    draw.clearScreen();
    draw.ctx.drawImage(
      document.getElementById("clock_background"),
      5,
      5,
      440,
      440
    );
    drawMinuteHand();
    drawHourHand();
    drawSecondHand();
    draw.circle(canvasWidth / 2, canvasHeight / 2, 16, "white");
  }
};

export { Clock };
