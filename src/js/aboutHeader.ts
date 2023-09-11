import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function aboutHeader() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".about-header")
  );

  elements.forEach((element) => {
    const smallText = element.querySelector<HTMLElement>(
      ".about-header__breadcrumbs"
    );
    const heading = element.querySelector<HTMLElement>(
      ".about-header__heading"
    );

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

    let animationHasRun = false;
    let screenWidth = window.innerWidth;
    const resizeHandler = () => {
      if (!animationHasRun) {
        if (window.innerWidth !== screenWidth) {
          heading?.replaceWith(originalHeading);
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
      delay: 1,
      onComplete: () => {
        heading?.replaceWith(originalHeading);
        animationHasRun = true;
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

    let mm = gsap.matchMedia();

    mm.add("(min-width: 641px)", () => {
      const bg = element.querySelector<HTMLDivElement>(
        ".about-header__parallax"
      );

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
