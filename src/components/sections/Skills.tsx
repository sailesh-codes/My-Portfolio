import React from 'react';
import { BestsellersBookShowcase } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame w-full h-[100vh] min-h-[720px] relative overflow-hidden bg-[#161616]">
      <BestsellersBookShowcase
        headingFont="iowan-old-style"
        bodyFont="iowan-old-style"
        headingWeight="500"
        bodyWeight="400"
        primaryColor="#c3a47b"
        headingSize={325}
        bodySize={17}
        headingLetterSpacing={-0.085}
      />
    </div>
  );
}

const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative w-full overflow-hidden border-t border-white/10 bg-[#161616]">
      <Scene />
    </section>
  );
};

export default Skills;
