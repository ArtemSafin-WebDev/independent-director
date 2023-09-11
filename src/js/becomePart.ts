import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";

import { ANIMATION_START } from "./constants";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function becomePart() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".become-part")
  );

  elements.forEach((element) => {
    const heading = element.querySelector<HTMLElement>(
      ".become-part__small-heading"
    );
    const largeText = element.querySelector<HTMLElement>(
      ".become-part__large-text"
    );
    const smallText = element.querySelector<HTMLElement>(
      ".become-part__small-text"
    );

    const btn = element.querySelector<HTMLElement>(".become-part__link");

    const originalLargeText = largeText?.cloneNode(true) as Element;
    const childLines = new SplitText(largeText, {
      type: "lines",
      linesClass: "lineChild",
    }).lines;
    const parentLines = new SplitText(largeText, {
      type: "lines",
      linesClass: "lineParent",
    }).lines;

    let animationHasRun = false;
    let screenWidth = window.innerWidth;
    const resizeHandler = () => {
      if (!animationHasRun) {
        if (window.innerWidth !== screenWidth) {
          largeText?.replaceWith(originalLargeText);
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
        largeText?.replaceWith(originalLargeText);
        animationHasRun = true;
      },
    });

    tl.fromTo(
      heading,
      {
        autoAlpha: 0,
        y: 30,
      },
      {
        autoAlpha: 1,
        duration: 0.4,
        y: 0,
        ease: "power1.out",
      }
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
      "<"
    );

    tl.fromTo(
      smallText,
      {
        autoAlpha: 0,
        y: 40,
      },
      {
        autoAlpha: 1,
        duration: 1,
        y: 0,
      },
      ">-=0.2"
    );
    tl.fromTo(
      btn,
      {
        autoAlpha: 0,
        y: 40,
      },
      {
        autoAlpha: 1,
        duration: 1,
        y: 0,
      },
      "<"
    );
  });
}
