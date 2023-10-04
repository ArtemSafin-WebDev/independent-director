import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";
import {ANIMATION_START} from "./constants.ts";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function recommend() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".recommend")
  );

  elements.forEach((element) => {
    const smallText = element.querySelector<HTMLElement>(
      ".recommend__heading"
    );
    const heading = element.querySelector<HTMLElement>(
      ".recommend__title"
    );
    const text = element.querySelector<HTMLElement>(
      ".recommend__text"
    );

    const originalHeading = heading?.cloneNode(true) as Element;
    const originalText = text?.cloneNode(true) as Element

    const childLinesSplitTextInstance = new SplitText([heading, text], {
      type: "lines",
      linesClass: "lineChild",
    });

    const parentLinesSplitTextInstance = new SplitText([heading, text], {
      type: "lines",
      linesClass: "lineParent",
    });

    const childLines = childLinesSplitTextInstance.lines;
    const parentLines = parentLinesSplitTextInstance.lines;

    let animationHasRun = false;
    let screenWidth = window.innerWidth;

    const resizeHandler = () => {
      if (!animationHasRun) {
        if (window.innerWidth !== screenWidth) {
          heading?.replaceWith(originalHeading);
          text?.replaceWith(originalText)
          animationHasRun = true;
          window.removeEventListener("resize", resizeHandler);
        } else {
          screenWidth = window.innerWidth;
          return;
        }
      } else {
        window.removeEventListener("resize", resizeHandler);
      }
    };

    window.addEventListener("resize", resizeHandler);

    gsap.set(parentLines, {
      overflow: "hidden",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: ANIMATION_START,
      },
      onComplete: () => {
        heading?.replaceWith(originalHeading);
        text?.replaceWith(originalText);
        animationHasRun = true;
      },
    });

    tl.fromTo(
      smallText,
      {
        autoAlpha: 0,
        y: 30,
      },
      {
        autoAlpha: 1,
        duration: 1,
        y: 0,
        ease: "power3.out",
      },
      "<"
    );

    tl.fromTo(
      childLines,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
      },
      ">-=0.5"
    );
  });

  function initParallax() {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 641px)", () => {
      const bg = document.querySelector<HTMLElement>(
        ".image-block__parallax-wrapper"
      );

      if(!bg) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bg,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(bg, {
        duration: 1,
        y: () => bg?.offsetHeight! * 0.3,
      });
    });
  }
  initParallax()

}
