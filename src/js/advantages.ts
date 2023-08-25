import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";
import { ANIMATION_START } from "./constants";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function advantages() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".advantages")
  );

  elements.forEach((element) => {
    const smallText = element.querySelector<HTMLElement>(
      ".advantages__small-text"
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: ANIMATION_START,
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
        ease: "power2.out",
      }
    );

    const numbersList = element.querySelector<HTMLElement>(
      ".advantages__numbers-list"
    );
    const numbersListItems = Array.from(
      element.querySelectorAll<HTMLElement>(".advantages__numbers-list-item")
    );
    const numbersTimeline = gsap.timeline({
      delay: 0.5,
      scrollTrigger: {
        trigger: numbersList,
        start: "top bottom",
      },
    });

    numbersListItems.forEach((item) => {
      const text = item.querySelector<HTMLSpanElement>(
        ".advantages__numbers-card-amount-text"
      );

      numbersTimeline.fromTo(
        text,
        {
          yPercent: 140,
        },
        {
          yPercent: 0,
          duration: 1.2,
          // ease: "none",
        },
        0
      );
    });

    const largeText = element.querySelector<HTMLElement>(
      ".advantages__large-text-inner"
    );

    const largeTextBlack = largeText?.cloneNode(true) as HTMLElement;
    largeText?.parentElement?.appendChild(largeTextBlack);

    if (largeTextBlack) {
      const splitResult = new SplitText(largeTextBlack, {
        type: "lines",
        linesClass: "line",
      });

      console.log("Split result", splitResult);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: largeText,
          start: "top+=60 bottom",
          end: () => `top+=${window.innerHeight * 1.5} bottom`,
          scrub: 1,
        },
      });

      const lines = splitResult.lines as HTMLElement[];

      lines.forEach((line) => {
        tl.fromTo(
          line,
          {
            // autoAlpha: 0,
            "clip-path": "polygon(0% 0%, 0% 0%, 0% 110%, 0 110%",
          },
          {
            // autoAlpha: 1,
            duration: 0.4,
            ease: "none",
            "clip-path": "polygon(0% 0%, 100% 0%, 100% 110%, 0 110%",
          }
        );
      });
    }
  });
}
