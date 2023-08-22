import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";
import Swiper from "swiper";
import { SwiperOptions, Swiper as SwiperInstance } from "swiper/types";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function clients() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".clients")
  );

  elements.forEach((element) => {
    let mm = gsap.matchMedia();
    const slider = element.querySelector<HTMLElement>(".clients__slider");
    const container = element.querySelector<HTMLElement>(".swiper");
    const slides = Array.from(
      element.querySelectorAll<HTMLElement>(".swiper-slide")
    );
    const wrapper = element.querySelector<HTMLElement>(".swiper-wrapper");
    let sliderInstance: SwiperInstance | null = null;
    const options: SwiperOptions = {
      slidesPerView: "auto",
      speed: 500,
      centeredSlides: true,
      loop: true,
    };

    for (let i = 0; i < 2; i++) {
      slides.forEach((slide) => {
        const clone = slide.cloneNode(true) as HTMLElement;
        clone.classList.add("cloned");
        wrapper?.appendChild(clone);
      });
    }

    mm.add("(min-width: 641px)", () => {
      if (sliderInstance) {
        sliderInstance.destroy();
        sliderInstance = null;
      }
      const calculateOffset = (): number => {
        const wrapperWidth: number = wrapper ? wrapper?.offsetWidth : 0;
        const notClonedSlides = Array.from(
          element.querySelectorAll<HTMLElement>(".swiper-slide:not(.cloned)")
        );
        const slideWidth = notClonedSlides.length
          ? notClonedSlides[0].offsetWidth
          : 1;
        const totalSlidesWidth: number = slideWidth * notClonedSlides.length;

        if (totalSlidesWidth > wrapperWidth) {
          return Math.abs(wrapperWidth - totalSlidesWidth) * -1;
        } else {
          return 0;
        }
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slider,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
        },
      });

      tl.to(wrapper, {
        x: () => calculateOffset(),
        duration: 1,
        ease: "none",
      });
    });

    mm.add("(max-width: 640px)", () => {
      if (sliderInstance) return;
      sliderInstance = new Swiper(container, options);
    });
  });
}
