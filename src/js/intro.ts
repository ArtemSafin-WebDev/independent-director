import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function intro() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".intro"));

  elements.forEach((element) => {
    const smallText = element.querySelector<HTMLElement>(".intro__small-text");
    const heading = element.querySelector<HTMLElement>(".intro__heading");
    const introBtn = element.querySelector<HTMLElement>(".intro__btn");
    const pageHeader = document.querySelector(".page-header");

    const originalHeading = heading?.cloneNode(true) as Element;

    const childLinesSplitTextInstance = new SplitText(heading, {
      type: "lines",
      linesClass: "lineChild",
    });

    const parentLinesSplitTextInstance = new SplitText(heading, {
      type: "lines",
      linesClass: "lineParent",
    });

    console.log(childLinesSplitTextInstance);

    const childLines = childLinesSplitTextInstance.lines;
    const parentLines = parentLinesSplitTextInstance.lines;

    gsap.set(parentLines, {
      overflow: "hidden",
    });

    const tl = gsap.timeline({
      delay: 1,
      onComplete: () => {
        heading?.replaceWith(originalHeading);
      },
    });

    tl.fromTo(
      pageHeader,
      {
        autoAlpha: 0,
        y: 30,
      },
      {
        autoAlpha: 1,
        duration: 1,
        y: 0,
        ease: "power3.out",
        clearProps: "all",
      }
    );

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

    tl.fromTo(
      introBtn,
      {
        autoAlpha: 0,
        y: 30,
      },
      {
        autoAlpha: 1,
        duration: 1.5,
        y: 0,
        ease: "power3.out",
      },
      "<"
    );

    let mm = gsap.matchMedia();

    mm.add("(min-width: 641px)", () => {
      const bg = element.querySelector<HTMLDivElement>(".intro__bg-parallax");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(bg, {
        duration: 1,
        y: () => element.offsetHeight * 0.3,
      });
    });
  });
}
