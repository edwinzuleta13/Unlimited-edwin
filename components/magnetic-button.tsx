"use client";

import { useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMouse } from "./mouse-context";
import type React from "react";
import type { ButtonHTMLAttributes } from "react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { setCursorVariant } = useMouse();
  const magneticStrength = 0.5;

  useAnimationFrame(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = window.mouseX || centerX;
    const mouseY = window.mouseY || centerY;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      setPosition({
        x: deltaX * force * magneticStrength,
        y: deltaY * force * magneticStrength,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  });

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <Button
        ref={ref}
        onClick={onClick}
        className={className}
        onMouseEnter={() => setCursorVariant("button")}
        onMouseLeave={() => setCursorVariant("default")}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}
