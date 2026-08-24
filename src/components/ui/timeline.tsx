"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useRef } from "react";

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
    <div className="w-full font-sans pb-10" ref={containerRef}>
      {/* SCFO Editorial Section Header */}
      <div className="max-w-5xl mx-auto px-6 lg:px-24 mb-16 pt-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="scfo-tag font-mono text-purple-400 font-bold">02</span>
          <span className="h-[1px] w-8 bg-purple-500/40" />
          <span className="scfo-tag">PORTFOLIO & CASE STUDIES</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-editorial text-white tracking-tight mb-4">
          Featured Projects
        </h2>
        <p className="text-lg text-white/60 max-w-xl font-normal">
          Here are some of my recent projects that showcase my skills and passion for development.
        </p>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto mb-20 px-6 lg:px-24">
        {data.map((item, index) => {
          const isRight = index % 2 === 0;
          const projectNum = String(index + 1).padStart(2, '0');

          return (
            <div
              key={index}
              className={`relative flex flex-col justify-start pt-12 md:pt-28 ${
                isRight ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Center SCFO Timeline Indicator */}
              <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 h-full w-10 z-20 pointer-events-none">
                 <div className="sticky top-40 h-8 w-8 rounded-full bg-[#08080a] flex items-center justify-center border border-white/20">
                   <div className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                 </div>
              </div>

              {/* Title Column */}
              <div
                className={`sticky flex flex-col z-30 top-40 self-start md:w-1/2 w-full ${
                  isRight ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                }`}
              >
                <span className="font-mono text-xs text-purple-400 tracking-widest mb-1">
                  PROJECT [ {projectNum} ]
                </span>
                <h3 className="hidden md:block text-2xl lg:text-4xl font-serif-editorial text-white">
                  {item.title}
                </h3>
              </div>

              {/* Content Box Column */}
              <div
                className={`relative w-full md:w-1/2 pl-14 pr-2 ${
                  isRight ? "md:pl-12 md:pr-0" : "md:pr-12 md:pl-0"
                }`}
              >
                <h3 className="md:hidden block text-2xl mb-4 font-serif-editorial text-white">
                  {item.title}
                </h3>
                {item.content}
              </div>
            </div>
          );
        })}

        {/* Central SCFO Line */}
        <div className="absolute md:left-1/2 md:-translate-x-1/2 left-7 top-0 bottom-0 overflow-hidden w-[1px] bg-white/10">
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[1px] bg-gradient-to-b from-purple-400 to-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
