import Swiper from "swiper";
import { Controller, EffectFade } from "swiper/modules";
import { SwiperOptions, Swiper as SwiperInstance } from "swiper/types";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/controller";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function tasks() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".tasks"));

  elements.forEach((element) => {
    const textSliderContainer = element.querySelector<HTMLElement>(
      ".tasks__text-slider .swiper"
    );
    const imageSliderContainer = element.querySelector<HTMLElement>(
      ".tasks__image-slider .swiper"
    );

    const slides = Array.from(
      element.querySelectorAll<HTMLElement>(".tasks__text-slider .swiper-slide")
    );
    const mql = window.matchMedia("(max-width: 640px)");
    let textSliderInstance: SwiperInstance | null = null;
    let imageSliderInstance: SwiperInstance | null = null;

    let scrollTrigger: ScrollTrigger | null = null;

    const textSliderOptions: SwiperOptions = {
      modules: [EffectFade, Controller],
      speed: 700,
      effect: "fade",
      fadeEffect: { crossFade: true },
      autoHeight: true,
    };

    const imageSliderDesktopOptions: SwiperOptions = {
      modules: [Controller],
      direction: "vertical",
      speed: 700,
      spaceBetween: 20,
      longSwipesRatio: 0.2,
    };

    const imageSliderMobileOptions: SwiperOptions = {
      modules: [Controller],
      slidesPerView: "auto",
      speed: 700,
      longSwipesRatio: 0.2,
      spaceBetween: 0,
      on: {
        slideChange: () => {
          ScrollTrigger.refresh();
        },
      },
    };

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (textSliderInstance) {
        textSliderInstance.destroy();
        textSliderInstance = null;
      }
      if (imageSliderInstance) {
        imageSliderInstance.destroy();
        imageSliderInstance = null;
      }

      if (scrollTrigger) {
        scrollTrigger.kill();
        scrollTrigger = null;
      }
      if (e.matches) {
        textSliderInstance = new Swiper(textSliderContainer, textSliderOptions);
        imageSliderInstance = new Swiper(
          imageSliderContainer,
          imageSliderMobileOptions
        );

        if (textSliderInstance && imageSliderInstance) {
          textSliderInstance.controller.control = imageSliderInstance;
          imageSliderInstance.controller.control = textSliderInstance;
        }
      } else {
        textSliderInstance = new Swiper(textSliderContainer, textSliderOptions);
        imageSliderInstance = new Swiper(
          imageSliderContainer,
          imageSliderDesktopOptions
        );

        if (textSliderInstance && imageSliderInstance) {
          textSliderInstance.controller.control = imageSliderInstance;
          imageSliderInstance.controller.control = textSliderInstance;
        }

        if (
          !window.matchMedia(
            "(max-aspect-ratio: 16 / 16) and (min-width: 641px)"
          ).matches
        ) {
          scrollTrigger = ScrollTrigger.create({
            trigger: element,
            start: "bottom bottom",
            end: () =>
              `bottom+=${window.innerHeight * 1 * slides.length} bottom`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const slidesCount = slides.length;
              const slideToSelect = Math.ceil(progress * slidesCount) - 1;

              textSliderInstance?.slideTo(slideToSelect);
            },
          });
        }
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);

    window.addEventListener("load", () => {
      if (textSliderInstance) textSliderInstance.updateAutoHeight();
    });
  });
}
