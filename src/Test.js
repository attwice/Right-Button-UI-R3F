import * as THREE from "three";
import { render } from "react-dom";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
// import './styles.css'

extend({ EffectComposer, RenderPass, UnrealBloomPass });

function Sphere({ geometry, x, y, z, s }) {
  const ref = useRef();

  return (
    <mesh ref={ref} position={[x, y, z]} scale={[s, s, s]} geometry={geometry}>
      <meshStandardMaterial color="hotpink" roughness={1} />
    </mesh>
  );
}

function RandomSpheres() {
  const [geometry] = useState(() => new THREE.SphereGeometry(1, 32, 32), []);
  const data = useMemo(() => {
    return new Array(15).fill().map((_, i) => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      z: Math.random() * 100 - 50,
      s: Math.random() + 10
    }));
  }, []);
  return data.map((props, i) => (
    <Sphere key={i} {...props} geometry={geometry} />
  ));
}

function Bloom({ children }) {
  const { gl, camera } = useThree();
  const [scene, setScene] = useState();
  const composer = useRef();
  useFrame(() => scene && composer.current.render(), 1);
  return (
    <>
      <scene ref={setScene}>{children}</scene>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
        <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 1, 0]} />
      </effectComposer>
    </>
  );
}

export const Test = () => {
  render(
    <Canvas style={{ width: "100vw", height: "100vh", background: "black" }}>
      {/* <Main>
      <pointLight />
      <ambientLight />
      <RandomSpheres />
    </Main> */}
      <Bloom>
        <ambientLight />
        <RandomSpheres />
      </Bloom>
    </Canvas>,
    document.querySelector("#root")
  );
};
