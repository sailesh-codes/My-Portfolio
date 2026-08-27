import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);
}

export { gsap, ScrollTrigger, Observer, ScrollToPlugin };
