"use client";
import React from "react";
import { Terminal } from "@/components/ui/terminal";

export default function TerminalDemo() {
  return (
    <section className="w-full py-10">
      <Terminal
        commands={[
          "whoami",
          "cat about.txt",
        ]}
        outputs={{
          0: ["Sailesh - Full Stack Developer"],
          1: [
            "I'm a passionate full-stack developer with expertise in modern web technologies.",
            "I love creating efficient, scalable solutions that solve real-world problems.",
            "",
            "With a strong foundation in React, Node.js, and Express, I build applications",
            "that are not only functional but also provide exceptional user experiences.",
            "I'm always eager to learn new technologies and take on challenging projects.",
            "",
            "When I'm not coding, you can find me exploring new technologies, contributing",
            "to open-source projects, or sharing knowledge with the developer community."
          ],
        }}
        typingSpeed={45}
        delayBetweenCommands={1000}
      />
    </section>
  );
}
