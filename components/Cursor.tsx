import React, { Fragment, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {};

const Cursor = (props: Props) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: any) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants: any = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "yellow",
      mixBlendMode: "difference",
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <>
      <h1
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
        className="text-white text-xl"
      >
        Hello World
      </h1>
      <motion.div
        className="fixed top-0 left-0  h-8 w-8 "
        variants={variants}
        animate={cursorVariant}
      >
        <div className="border-white border-2 border-dashed h-8 w-8 rounded-full   flex justify-center items-center animate-spin ">
          <div className="rounded-full bg-white h-2 w-2 transition"></div>
        </div>
      </motion.div>
    </>
  );
};

export default Cursor;
