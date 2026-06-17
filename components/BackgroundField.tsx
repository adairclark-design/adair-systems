"use client";

import { motion } from "framer-motion";

const auroraLayers = [
  {
    className: "veil-indigo",
    animate: { x: [0, 28, -16, 0], y: [0, -24, 16, 0], scale: [1, 1.06, 0.98, 1] },
    duration: 28
  },
  {
    className: "veil-cyan",
    animate: { x: [0, -30, 20, 0], y: [0, 22, -14, 0], scale: [1, 0.96, 1.08, 1] },
    duration: 32
  }
];

export function BackgroundField() {
  return (
    <div className="background-field" aria-hidden="true">
      {auroraLayers.map((layer) => (
        <motion.div
          key={layer.className}
          className={`field-veil ${layer.className}`}
          animate={layer.animate}
          transition={{ duration: layer.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="field-prism"
        animate={{ rotate: [0, 7, -5, 0], scale: [1, 1.04, 0.98, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="field-mesh" />
      <div className="field-ribbon field-ribbon-a" />
      <div className="field-ribbon field-ribbon-b" />
    </div>
  );
}
