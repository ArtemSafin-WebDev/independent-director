import Swiper from "swiper";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";
import "swiper/css";
import "swiper/css/effect-fade";
import { ANIMATION_START } from "./constants";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function reviews() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".reviews")
  );

  elements.forEach((element) => {
    const heading = element.querySelector<HTMLElement>(
      ".reviews__small-heading"
    );
    const largeText = element.querySelector<HTMLElement>(
      ".reviews__large-text"
    );
    const sliderWrapper = element.querySelector<HTMLElement>(
      ".reviews__bottom-row"
    );

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
      sliderWrapper,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
      }
    );

    const container = element.querySelector<HTMLElement>(".swiper");

    const options: SwiperOptions = {
      modules: [EffectFade, Navigation, Pagination],
      speed: 500,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoHeight: true,
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".reviews__arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".reviews__arrow--next"
        ),
      },
      pagination: {
        el: element.querySelector<HTMLElement>(".reviews__slider-pagination"),
        clickable: true,
        type: "bullets",
      },
      on: {
        slideChange: () => {
          ScrollTrigger.refresh();
        },
      },
    };

    const instance = new Swiper(container, options);

    window.addEventListener("load", () => {
      instance.updateAutoHeight();
    });
  });
}
