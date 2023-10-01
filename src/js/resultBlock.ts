import Swiper from "swiper";
import {EffectCreative, Navigation} from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import "swiper/css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
import { ANIMATION_START } from "./constants";

export default function resultBlock() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".result-block")
  );

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    const options: SwiperOptions = {
      modules: [Navigation, EffectCreative],
      effect: "creative",
      creativeEffect: {
        prev: {
          translate: [0, 0, -400],
        },
        next: {
          translate: ["105%", 0, 0],
        },
      },
      slidesPerView: "auto",
      speed: 800,
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".result-block__arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".result-block__arrow--next"
        ),
      },
    };

    new Swiper(container, options);

    const heading = element.querySelector<HTMLElement>(
      ".result-block__small-heading"
    );
    const largeText = element.querySelector<HTMLElement>(
      ".result-block__large-text"
    );
    const slider = element.querySelector<HTMLElement>(".result-block__slider");

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
