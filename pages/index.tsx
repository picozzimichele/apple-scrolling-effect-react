import { useEffect, useRef, useState } from "react";
import Canva from "./canva";

export default function Home() {
  return (
    <div className="h-screen bg-black py-20">
      <Canva />
    </div>
  );
}
