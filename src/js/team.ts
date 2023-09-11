import Swiper from "swiper";
import { SwiperOptions, Swiper as SwiperInstance } from "swiper/types";
import "swiper/css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIMATION_START } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function team() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".team"));

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    const mql = window.matchMedia("(max-width: 640px)");
    const options: SwiperOptions = {
      slidesPerView: "auto",
      speed: 600,
    };

    let instance: SwiperInstance | null = null;

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (instance) {
        instance.destroy();
        instance = null;
      }
      if (e.matches) {
        instance = new Swiper(container, options);
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);

    const heading = element.querySelector<HTMLElement>(".team__small-heading");
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".team__card, .team__career-link")
    );

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
    ).fromTo(
      cards,
      {
        autoAlpha: 0,
        y: 30,
      },
      {
        autoAlpha: 1,
        duration: 1,
        ease: "power1.out",
        stagger: 0.3,
        y: 0,
      },
      "<"
    );
  });
}
