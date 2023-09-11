import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import "swiper/css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
import { ANIMATION_START } from "./constants";

export default function ourGoal() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".our-goal")
  );

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    const options: SwiperOptions = {
      modules: [Navigation, Pagination],
      slidesPerView: "auto",
      longSwipesRatio: 0.2,
      speed: 800,
      pagination: {
        el: element.querySelector<HTMLElement>(".our-goal__slider-pagination"),
      },
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".our-goal__arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".our-goal__arrow--next"
        ),
      },
    };

    new Swiper(container, options);

    const heading = element.querySelector<HTMLElement>(
      ".our-goal__small-heading"
    );
    const largeText = element.querySelector<HTMLElement>(
      ".our-goal__large-text"
    );
    const slider = element.querySelector<HTMLElement>(".our-goal__slider");

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
      slider,
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
  });
}
