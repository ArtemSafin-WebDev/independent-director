import Swiper from "swiper";
import {
  Controller,
  Navigation,
  EffectCreative,
  EffectFade,
} from "swiper/modules";
import type { SwiperOptions, Swiper as TSwiper } from "swiper/types";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ANIMATION_START } from "./constants";

gsap.registerPlugin(ScrollTrigger);

import "swiper/css";
import "swiper/css/effect-fade";

export default function history() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".history")
  );

  elements.forEach((element) => {
    const mainContainer = element.querySelector<HTMLElement>(
      ".history__slider-main .swiper"
    );
    const textContainer = element.querySelector<HTMLElement>(
      ".history__slider-text .swiper"
    );
    const yearsContainer = element.querySelector<HTMLElement>(
      ".history__slider-years .swiper"
    );

    const heading = element.querySelector<HTMLElement>(
      ".history__small-heading"
    );

    const slider = element.querySelector<HTMLElement>(".history__slider");

    const mainOptions: SwiperOptions = {
      modules: [Controller, Navigation, EffectCreative],
      speed: 800,
      effect: "creative",
      longSwipesRatio: 0.2,
      slidesPerView: "auto",
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".history__arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".history__arrow--next"
        ),
      },
      creativeEffect: {
        limitProgress: 100,
        progressMultiplier: 1,
        prev: {
          translate: [0, 0, -600],
          scale: 1,
          opacity: 1,
        },
        next: {
          translate: ["100%", 0, 0],
          scale: 1,
          opacity: 1,
        },
      },
    };

    const yearsOptions: SwiperOptions = {
      modules: [Controller, Navigation, EffectCreative],
      speed: 800,
      effect: "creative",
      longSwipesRatio: 0.2,
      slidesPerView: 1,
      threshold: 6,
      slideToClickedSlide: true,
      creativeEffect: {
        limitProgress: 100,
        progressMultiplier: 1,
        prev: {
          translate: [0, 0, 0],
          scale: 1,
          opacity: 1,
        },
        next: {
          translate: ["100%", 0, 0],
          scale: 1,
          opacity: 1,
        },
      },
    };

    const textOptions: SwiperOptions = {
      modules: [EffectFade, Controller],
      autoHeight: false,
      speed: 800,
      effect: "fade",
      longSwipesRatio: 0.2,
      fadeEffect: {
        crossFade: true,
      },
      //   on: {
      //     slideChange: () => {
      //       ScrollTrigger.refresh();
      //     },
      //   },
    };

    const mainInstance: TSwiper = new Swiper(mainContainer, mainOptions);
    const textInstance: TSwiper = new Swiper(textContainer, textOptions);
    const yearsInstance: TSwiper = new Swiper(yearsContainer, yearsOptions);

    mainInstance.controller.control = [yearsInstance, textInstance];
    textInstance.controller.control = mainInstance;
    yearsInstance.controller.control = mainInstance;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: ANIMATION_START,
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
      slider,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 1,
        ease: "power1.out",
      }
    );
  });
}
