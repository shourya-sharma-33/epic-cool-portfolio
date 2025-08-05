import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./components/Plane";
import { OrbitControls } from "@react-three/drei";

function Hero() {
  const [heroHover, setHeroHover] = useState(false);

  return (
    <div
      className={` top-0 left-0 w-screen h-screen m-0 p-0 bg-blue-950 ${
        heroHover ? "hero-hover" : "hero"
      } transition-all duration-500`}
    >
      <Canvas
        camera={{ position: [1, 0, 1], fov: 55 }}
        className=" w-full h-full"
      >
        <ambientLight intensity={0.7} />
        <Suspense fallback={null}>
          <Model scale={1} rotation={[0.2,1.4, 0]} className="duration-500" position={[0, -0.1, 0]} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <div className="jersey-25-regular absolute bottom-0 justify-self-center pb-0 text-[13rem] text-white hover:text-white/60">
        <span
  className={`relative inline-blocktext-white`}
  style={{
    letterSpacing: heroHover ? "0.05em" : "0"
    
    ,transition: "0.8s",
  }}
  onMouseEnter={() => setHeroHover(true)}
  onMouseLeave={() => setHeroHover(false)}
>
  {heroHover ? <p className="relative"><span className="text-2xl w-full px-20 top-[350px] absolute" >I DESIGN AND I DEVELOP, BUT MY SPECIALITY IS</span><br />THAT I COOK</p> : "SHOURYA SHARMA"}
</span>
<p className="text-lg absolute fredoka-font bottom-12">
  
</p>

        {/* <ul className="text-xl justify-between px-5 flex w-full ">
          <li>sias</li>
          <li>sias</li>
          <li>sias</li>
        </ul> */}
      </div>
    </div>
  );
}

export default Hero;
