"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans pb-10"
      ref={containerRef}
    >
      <motion.div 
        className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 text-center mb-16 pt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          Featured Projects
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and passion for development.
        </p>
      </motion.div>

      <div ref={ref} className="relative max-w-7xl mx-auto mb-20">
        {data.map((item, index) => {
          // even indexes (0, 2...) have content on right, title on left
          const isRight = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -50% 0px" }}
              className={`relative flex flex-col justify-start pt-10 md:pt-40 md:gap-0 ${
                isRight ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Center Dot Column */}
              <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 h-full w-10 z-20 pointer-events-none">
                 <div className="sticky top-[10.5rem] md:top-40 h-10 w-10 rounded-full bg-black flex items-center justify-center border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                   <motion.div 
                     variants={{
                       hidden: { scale: 0, opacity: 0 },
                       visible: { scale: 1, opacity: 1 }
                     }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                     className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]" 
                   />
                 </div>
              </div>

              {/* Title Container */}
              <div
                className={`sticky flex flex-col md:flex-row z-30 items-center top-40 self-start md:w-1/2 w-full ${
                  isRight ? "md:justify-end md:text-right" : "md:justify-start md:text-left"
                }`}
              >
                <h3
                  className={`hidden md:block text-xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent ${
                    isRight ? "md:pr-12 lg:pr-20" : "md:pl-12 lg:pl-20"
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              {/* Content Box */}
              <div
                className={`relative w-full md:w-1/2 pl-20 pr-4 ${
                  isRight ? "md:pl-12 lg:pl-20 md:pr-0 md:pr-4" : "md:pr-12 lg:pr-20 md:pl-0 md:pl-4"
                }`}
              >
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {item.title}
                </h3>
                {item.content}{" "}
              </div>
            </motion.div>
          );
        })}
        <div
          className="absolute md:left-1/2 md:-translate-x-1/2 left-8 top-0 bottom-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
