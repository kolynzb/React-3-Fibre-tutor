import {
  Box,
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
} from "@react-three/drei";
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useSpring, a } from "@react-spring/three";

softShadows();
type Props = {};
// 24:00

const learn: NextPage = (props: Props) => {
  return (
    <>
      {/* we add color management to give the box better color */}
      <Canvas
        style={{ width: `100vw`, height: `100vh` }}
        shadowMap
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[-10, 0, 20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
        </group>
        <Cube
          position={[0, 1, 0]}
          args={[3, 2, 1]}
          color="lightblue "
          speed={2}
        />
        <Cube position={[-2, 1, -5]} args={[1, 1, 1]} color="pink" speed={6} />
        <Cube position={[5, 1, -2]} args={[1, 1, 1]} color="pink" speed={6} />
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default learn;
interface CubeProps extends MeshProps {}

const Cube = ({ position, args, color, speed }: any) => {
  const mesh = useRef<Mesh>(null);
  useFrame(() => (mesh.current!.rotation.x = mesh.current!.rotation.y += 0.01));

  const [expand, setExpand] = useState<boolean>(false);
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
      position={position}
      ref={mesh}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      {/* <meshStandardMaterial attach="material" color={color} /> */}
      <MeshWobbleMaterial
        attach="material"
        color={color}
        speed={speed}
        factor={0.6}
      />
    </a.mesh>
  );
};
