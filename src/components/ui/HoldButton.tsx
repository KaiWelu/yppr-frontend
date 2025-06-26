"use client";
/* THIS IS EXPERIMENTAL */
/* I don't understand it completely and it's just a reference for animation */
import { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

type HoldButtonProps = {
  onHoldComplete: () => void;
};

const HoldButton = ({ onHoldComplete }: HoldButtonProps) => {
  const [holding, setHolding] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();

  const handleMouseDown = () => {
    setHolding(true);

    controls.start({
      scaleX: 1,
      transition: { duration: 1, ease: "linear" },
    });

    timeoutRef.current = setTimeout(() => {
      onHoldComplete();
      setHolding(false);
      controls.set({ scaleX: 0 });
    }, 1000);
  };

  const handleMouseUp = () => {
    setHolding(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    controls.start({ scaleX: 0, transition: { duration: 0.2 } });
  };

  return (
    <div className="relative w-fit">
      <motion.button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        whileHover={{
          scale: 1.05,
          rotate: [0, -1, 1, 0],
          transition: { duration: 0.3 },
        }}
        className={
          "bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md relative z-10"
        }
      >
        Hold to Confirm
      </motion.button>

      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-purple-300 z-0 rounded"
        initial={{ scaleX: 0 }}
        animate={controls}
        style={{ originX: 0, width: "100%" }}
      />
    </div>
  );
};

export default HoldButton;
