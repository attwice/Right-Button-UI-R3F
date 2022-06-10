import React, { useRef } from "react";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Stats, useHelper } from "@react-three/drei";
import * as THREE from "three";

const CubeWithHelpers = () => {
  const cubeRef = useRef();
  useHelper(cubeRef, THREE.BoxHelper, "blue");

  // useFrame(() => {
  //   cubeRef.current.rotation.x += 0.01;
  //   cubeRef.current.rotation.y += 0.01;
  // });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshLambertMaterial color={"red"} />
    </mesh>
  );
};

const LightWithHelpers = () => {
  const lightRef = useRef();
  useHelper(lightRef, THREE.DirectionalLightHelper, "red");

  return <directionalLight ref={lightRef} position={[5, 5, 0]} color="green" />;
};

export default function BoxScene() {
  return (
    <div>
      <Canvas style={{ height: 400, width: 400 }}>
        <pointLight position={[5, 5, 5]} />
        <CubeWithHelpers />
        <LightWithHelpers />
        <OrbitControls />
        <Stats />
      </Canvas>
    </div>
  );
}
