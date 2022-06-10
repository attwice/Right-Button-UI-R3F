import { OrbitControls, useHelper } from "@react-three/drei";
import Model from "./Head";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BeatLoader } from "react-spinners";

import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { UnrealBloomPass } from "./BloomPass";
import { default21Channels, getChannelPosition } from "./utils";

extend({ EffectComposer, RenderPass, UnrealBloomPass });

const cylinders = default21Channels.map((channel) => {
  const r1 = 0.3;
  const r2 = 0.6;
  const r3 = 0.7;
  return {
    type: channel.type,
    ...getChannelPosition(channel.type, r1, r2, r3)
  };
});

export const Visualizer = ({ onChannels }) => {
  return (
    <Canvas
      style={{
        width: "calc(100% - 500px)",
        height: "100%",
        backgroundColor: "#fff"
      }}
    >
      <Scene onChannels={onChannels} />
      <OrbitControls />
      {/* <Bloom>
          <ambientLight />
          <Sphere x={0} y={2.7} z={0} s={0.05} />
        </Bloom> */}
    </Canvas>
  );
};

const Scene = ({ onChannels }) => {
  const lightRefs = useRef([]);
  const [lightsDimming, setLightsDimming] = useState(false);

  useEffect(() => {
    lightRefs.current.forEach((light) => {
      if (light) {
        light.intensity = 0;
      }
    });
  }, [onChannels]);

  useFrame(() => {
    lightRefs.current.forEach((light) => {
      if (light) {
        if (lightsDimming) {
          light.intensity -= 0.25;
        } else {
          light.intensity += 0.25;
        }
        if (light.intensity <= 0 && lightsDimming) {
          setLightsDimming(false);
        }
        if (light.intensity >= 20 && !lightsDimming) {
          setLightsDimming(true);
        }
      }
    });
  });

  return (
    <Main>
      <ambientLight color="#979DA0" intensity={1} />
      <spotLight position={(0, 0, -1.1)} intensity={1} />
      <spotLight position={(10, 10, 0.8)} intensity={1} decay={5} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>

      {cylinders.map(({ type, x, y, z, rotX, rotY, rotZ }, i) => {
        return (
          <>
            <Cylinder
              key={`c1${i}`}
              x={x}
              y={y}
              z={z}
              s={0.05}
              rotX={rotX}
              rotY={rotY}
              rotZ={rotZ}
              color="#ddd"
              height={1}
            />
            <Cylinder
              key={`c2${i}`}
              x={x}
              y={y}
              z={z}
              s={0.02}
              rotX={rotX}
              rotY={rotY}
              rotZ={rotZ}
              color={
                onChannels.some((ch) => type === ch.type) ? "#8AB5F4" : "#fff"
              }
              height={3}
            />
            {onChannels.some((ch) => type === ch.type) && (
              <pointLight
                ref={(element) => (lightRefs.current[i] = element)}
                key={`light${type}`}
                position={[
                  !["a1", "a2"].includes(type)
                    ? x
                    : x < 0
                    ? x - 0.02
                    : x + 0.02,
                  y + 0.03,
                  z
                ]}
                color="#2061C3"
                intensity={1}
                distance={5}
                decay={20}
              />
            )}
          </>
        );
      })}
    </Main>
  );
};

function Cylinder({ x, y, z, s, rotX, rotY, rotZ, color, height }) {
  const [geometry] = useState(
    () => new THREE.CylinderGeometry(1, 1, height, 32),
    []
  );
  const ref = useRef();

  return (
    <mesh
      ref={ref}
      position={[x, y, z]}
      scale={[s, s, s]}
      rotation={[rotX, rotY, rotZ]}
      geometry={geometry}
    >
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}

function Main({ children }) {
  const scene = useRef();
  const { gl, camera } = useThree();
  useFrame(() => {
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene.current, camera);
  }, 2);
  return <scene ref={scene}>{children}</scene>;
}

// function Bloom({ children }) {
//   const { gl, camera } = useThree();
//   const [scene, setScene] = useState();
//   const composer = useRef();
//   useFrame(() => scene && composer.current.render(), 1);
//   return (
//     <>
//       <scene ref={setScene}>{children}</scene>
//       <effectComposer ref={composer} args={[gl]}>
//         <renderPass attachArray="passes" scene={scene} camera={camera} />
//         <unrealBloomPass
//           col
//           attachArray="passes"
//           args={[undefined, 5, 0.1, 0]}
//         />
//       </effectComposer>
//     </>
//   );
// }
