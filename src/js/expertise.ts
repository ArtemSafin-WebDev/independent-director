import Swiper from "swiper";
import { EffectCreative, Controller, EffectFade } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/controller";
import { ANIMATION_START } from "./constants";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function expertise() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".expertise")
  );

  elements.forEach((element) => {
    const heading = element.querySelector<HTMLElement>(
      ".expertise__small-heading"
    );
    const largeText = element.querySelector<HTMLElement>(
      ".expertise__large-text"
    );

    const originalLargeText = largeText?.cloneNode(true) as Element;

    const sliderBlock =
      element.querySelector<HTMLElement>(".expertise__slider");
    const textSliderBlock = element.querySelector<HTMLElement>(
      ".expertise__text-slider"
    );
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
      [sliderBlock, textSliderBlock],
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out",
      }
    );

    const mainContainer = element.querySelector<HTMLElement>(
      ".expertise__slider .swiper"
    );
    const textContainer = element.querySelector<HTMLElement>(
      ".expertise__text-slider .swiper"
    );
    if (!mainContainer || !textContainer) return;
    const mainSlides = Array.from(
      mainContainer.querySelectorAll<HTMLElement>(".swiper-slide")
    );
    const textSlides = Array.from(
      textContainer.querySelectorAll<HTMLElement>(".swiper-slide")
    );

    const mainWrapper =
      mainContainer.querySelector<HTMLElement>(".swiper-wrapper");
    const textWrapper =
      textContainer.querySelector<HTMLElement>(".swiper-wrapper");

    for (let i = 0; i < 2; i++) {
      mainSlides.forEach((slide) => {
        mainWrapper?.appendChild(slide.cloneNode(true));
      });
      textSlides.forEach((slide) => {
        textWrapper?.appendChild(slide.cloneNode(true));
      });
    }

    const newMainSlides = Array.from(
      mainContainer.querySelectorAll(".swiper-slide")
    );
    const initialNumberOfMainSlides = newMainSlides.length;

    const textSliderOptions: SwiperOptions = {
      modules: [EffectFade],
      speed: 500,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      autoHeight: true,
      allowTouchMove: false,
      on: {
        slideChange: () => {
          ScrollTrigger.refresh();
        },
      },
    };

    const textSliderInstance = new Swiper(textContainer, textSliderOptions);
    const mainSliderOptions: SwiperOptions = {
      modules: [EffectCreative, Controller],
      speed: 800,
      slidesPerView: "auto",
      loop: true,
      centeredSlides: false,
      longSwipesRatio: 0.2,
      slideToClickedSlide: true,
      effect: "creative",
      threshold: 6,
      watchSlidesProgress: true,
      creativeEffect: {
        limitProgress: 100,
        progressMultiplier: 1,
        prev: {
          translate: ["-100%", 0, 0],
          scale: 1,
        },
        next: {
          translate: ["100%", 0, 0],
          scale: 1,
        },
      },
      controller: {
        control: textSliderInstance,
      },
    };

    const instance = new Swiper(mainContainer, mainSliderOptions);

    instance.slideTo(initialNumberOfMainSlides / 2, 0);

    window.addEventListener("load", () => {
      textSliderInstance.updateAutoHeight(0);
      ScrollTrigger.refresh();
    });
  });
}
