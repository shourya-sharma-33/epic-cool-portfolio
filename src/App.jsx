import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./components/Plane";
import { OrbitControls } from "@react-three/drei";
import Hero from "./hero";
import About from "./about";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Hero/>
      <About/>
    </div>
  );
}

export default App;
