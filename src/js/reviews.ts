import Swiper from "swiper";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

export default function reviews() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".reviews")
  );

  elements.forEach((element) => {
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
