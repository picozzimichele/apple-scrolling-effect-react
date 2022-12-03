import React, { useEffect, useRef } from "react";

export default function Canva() {
  const mainDivRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef(null);
  const frameCount = 147;

  const currentFrame = (index: number) => {
    return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
      .toString()
      .padStart(4, "0")}.jpg`;
  };

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  useEffect(() => {
    // canvasRef
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const mainDiv = mainDivRef.current;

    preloadImages();

    if (canvas !== null) {
      canvas.height = 770;
      canvas.width = 1158;
    }
    let img = new Image();

    img.src = currentFrame(20);
    img.onload = () => {
      context?.drawImage(img, 0, 0);
    };

    const updateImage = (index: number) => {
      img.src = currentFrame(index);
      context?.drawImage(img, 0, 0);
    };

    window.addEventListener("scroll", () => {
      if (mainDiv !== null) {
        const frameIndex = Math.round(
          (window.scrollY / mainDiv.clientHeight) * frameCount
        );
        if (frameIndex <= frameCount && frameIndex > 20) {
          updateImage(frameIndex);
        }
      }
    });
  }, []);

  return (
    <div ref={mainDivRef} className="h-[500vh] py-20 bg-black">
      <canvas
        ref={canvasRef}
        id="canvas"
        className="fixed -translate-y-1/2 -translate-x-1/2  max-w-full max-h-full left-1/2 top-1/2"
      ></canvas>
    </div>
  );
}
