import {SwiperOptions} from "swiper/types";
import Swiper from "swiper";
import {Navigation, Parallax, EffectCreative} from "swiper/modules"
import "swiper/scss"

export default function competitionSlider(): void {
  const competitionBlock = Array.from(
    document.querySelectorAll<HTMLDivElement>(".competition")
  )

  competitionBlock.forEach((element) => {
    const container = element!?.querySelector<HTMLElement>(".swiper")
    if(!container) return

    const swiperOptions: SwiperOptions = {
      modules: [Navigation, Parallax, EffectCreative],
      effect: "creative",
      creativeEffect: {
        prev: {
          translate: [0, 0, -400],
        },
        next: {
          translate: ["108%", 0, 0],
        },
      },
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(".competition__arrow--prev"),
        nextEl: element.querySelector<HTMLButtonElement>(".competition__arrow--next"),
      },
      parallax: true,
      longSwipesRatio: 0.2,
      allowTouchMove: true,
      centeredSlides: true,
      slidesPerView: "auto",
      speed: 800,
      watchOverflow: true,
    }
    new Swiper(container, swiperOptions)
  })

}
