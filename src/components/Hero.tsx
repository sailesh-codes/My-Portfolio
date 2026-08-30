import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

const HLS_STREAM_URL =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

const roles = ['Creative', 'Fullstack', 'Founder', 'Scholar'];

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Initialize HLS Video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const HlsClass = (window as unknown as { Hls?: any }).Hls;

    if (HlsClass && HlsClass.isSupported()) {
      const hls = new HlsClass({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(HlsClass.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  // Cycling roles every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        '-=0.8'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
      </div>

      {/* Centered Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center pt-24 pb-20">
        {/* Eyebrow */}
        <div className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 font-medium">
          COLLECTION &apos;26
        </div>

        {/* Name */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Michael Smith
        </h1>

        {/* Role line */}
        <div className="blur-in text-lg sm:text-xl md:text-2xl text-text-primary/90 font-light mb-6 tracking-wide flex items-center justify-center gap-1.5 flex-wrap">
          <span>A</span>
          <span
            key={roleIndex}
            className="font-display italic text-text-primary text-xl sm:text-2xl md:text-3xl animate-role-fade-in inline-block font-normal text-[#89AACC]"
          >
            {roles[roleIndex]}
          </span>
          <span>lives in Chicago.</span>
        </div>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12 leading-relaxed">
          Designing seamless digital interactions by focusing on the unique nuances which bring
          systems to life.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in inline-flex flex-wrap justify-center items-center gap-4">
          {/* "See Works" Solid button with accent hover ring */}
          <a
            href="#work"
            className="group relative inline-flex items-center justify-center rounded-full text-sm font-medium px-7 py-3.5 bg-text-primary text-bg transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-text-primary group-hover:bg-bg rounded-full px-7 py-3.5 -mx-7 -my-3.5">
              See Works
            </span>
          </a>

          {/* "Reach out..." Outlined button */}
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center rounded-full text-sm font-medium px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary transition-all duration-300 hover:scale-105 hover:border-transparent cursor-pointer"
          >
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <span className="relative z-10">Reach out...</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-10">
        <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
