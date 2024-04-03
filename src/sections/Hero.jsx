import { Canvas } from '@react-three/fiber';
import React, { Suspense, useState } from 'react';
import Computer from '../models/Computer';
import TypeIt from 'typeit-react';

const Hero = () => {
  const [isRotating, setIsRotating] = useState(false);

  const adjustComputerForScreenSize = () => {
    // position={[0, -3, 0]} rotation={[-1.5, 0, 0]} scale={10}
    let screenScale = null;
    let screenPosition = [0, -45, -150];
    let rotation = [-1.5, 0, 0];
    if (window.innerWidth < 768) {
      screenScale = [50, 50, 50];
    } else {
      screenScale = [15, 15, 15];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [computerScale, computerPosition, computerRotation] =
    adjustComputerForScreenSize();
  return (
    <section>
      <div className="h-80 mx-2">
        <Canvas camera={{ position: [0, 0, 25], fov: 55 }}>
          <Suspense>
            <directionalLight position={[1, 1, 1]} intensity={3} />
            <ambientLight intensity={0.5} />
            <hemisphereLight
              skycColor="#b1efff"
              groundColor="#000000"
              intensity={1}
            />

            <Computer
              position={computerPosition}
              rotation={computerRotation}
              scale={computerScale}
              setIsRotating={setIsRotating}
              isRotating={isRotating}
            />
          </Suspense>
        </Canvas>
        <div className="px-5 pb-10 text-justify">
          <TypeIt options={{waitUntilVisible:true,speed:50}} as={"p"}>
            👋 Hi, I am Rajat Sharma  Yes, it's me – the web
            developer with a knack for turning your wildest digital dreams into
            reality. Currently donning the cape of a full-stack developer, I
            proudly admit: I have no life outside the world of codes and pixels.
            But hey, that's fantastic news for you! Why hire me? Well, I can
            code for 8 hours straight (Call it dedication or a lack of a social
            life)&nbsp; 
          </TypeIt>
        </div>
      </div>
      {/* <hr className='nav-hr'/> */}
    </section>
  );
};

export default Hero;
