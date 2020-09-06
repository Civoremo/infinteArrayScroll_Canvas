/** @format */

import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
  const {  draw2dGrid, grid } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const cnvs = canvasRef.current;
    const ctx = cnvs.getContext("2d");
    // grid = create2dGrid();
    draw2dGrid(ctx, grid);
    return () => {};
  }, []);

  useEffect(() => {
    const cnvs = canvasRef.current;
    const ctx = cnvs.getContext("2d");
    // let frameId;
    
    const render = () => {
       draw2dGrid(ctx, grid);
    };
    setInterval(render, 10)
    // frameId = requestAnimationFrame(render);
    return () => {
    //   cancelAnimationFrame(frameId);
    };
  }, [draw2dGrid]);

  return (
    <div>
      <canvas
        width={300}
        height={300}
        ref={canvasRef}
        style={{ background: "lightgrey" }}
      ></canvas>
    </div>
  );
};

export default Canvas;
