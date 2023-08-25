import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { isTouch } from "./utils";

gsap.registerPlugin(ScrollTrigger);

export default function smoothScrolling() {
  if (isTouch()) return;
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const anchorLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".js-anchor")
  );
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const hash = link.hash;
      lenis.scrollTo(hash, {
        offset: -30,
      });
    });
  });
}
