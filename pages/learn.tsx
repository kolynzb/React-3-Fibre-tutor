import { NextPage } from "next";
import React from "react";
import { Canvas } from "react-three-fiber";

type Props = {};17:56

const learn: NextPage = (props: Props) => {
  return (
    <>
      <Canvas className="h-[100vh] fixed w-[100vw]">
        <mesh>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" />
        </mesh>
      </Canvas>
    </>
  );
};

export default learn;
