"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import React, { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  return (
    <div className={cn("relative flex md:hidden items-center justify-center w-full mt-4", className)}>
      <div className="fluid-glass-dock apple-glass-dock flex flex-row flex-nowrap items-center justify-center gap-2.5 sm:gap-4 rounded-2xl sm:rounded-3xl px-3 sm:px-4.5 py-2.5 sm:py-3.5 max-w-full overflow-x-auto no-scrollbar">
        {items.map((item) => (
          <a
            href={item.href}
            key={item.title}
            aria-label={item.title}
            target={item.href.startsWith('http') ? "_blank" : undefined}
            rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
            className="fluid-glass-dock-item apple-glass-dock-item flex h-[2.9rem] w-[2.9rem] sm:h-[3.6rem] sm:w-[3.6rem] flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="dock-icon-wrapper h-5 w-5 sm:h-7 sm:w-7 flex items-center justify-center text-white">{item.icon}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  const dockRef = useRef<HTMLDivElement>(null);
  const [fluidPos, setFluidPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.pageX);
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setFluidPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--fluid-x": `${fluidPos.x}%`,
          "--fluid-y": `${fluidPos.y}%`,
          "--fluid-opacity": isHovered ? "0.95" : "0.5",
        } as React.CSSProperties
      }
      className={cn(
        "fluid-glass-dock apple-glass-dock mr-auto ml-0 hidden h-[6rem] mt-6 items-end gap-7 rounded-3xl px-5 pb-3.5 md:flex",
        className,
      )}
    >
      {/* Dynamic Fluid Glass Refraction Caustic Glare */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.95 : 0.35 }}
      >
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{
            background: `radial-gradient(circle 110px at ${fluidPos.x}% ${fluidPos.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.06) 45%, transparent 100%)`,
          }}
        />
      </div>

      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [64, 96, 64]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [64, 96, 64]);
  let yTransform = useTransform(distance, [-150, 0, 150], [0, -20, 0]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [32, 48, 32]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [32, 48, 32],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let y = useSpring(yTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      aria-label={title}
      target={href.startsWith('http') ? "_blank" : undefined}
      rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
    >
      <motion.div
        ref={ref}
        style={{ width, height, y }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fluid-glass-dock-item apple-glass-dock-item relative flex aspect-square items-center justify-center rounded-full"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="fluid-glass-dock-tooltip apple-glass-dock-tooltip -top-11"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="dock-icon-wrapper flex items-center justify-center text-white"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
