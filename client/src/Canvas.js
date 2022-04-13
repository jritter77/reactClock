import { useEffect, useRef } from "react";
import { Draw } from "./Draw";

const Canvas = ({ height, width, style, setCtx }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    setCtx(ctx);
  });

  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      style={style}
    ></canvas>
  );
};

export { Canvas };
