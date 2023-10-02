import {SwiperOptions} from "swiper/types";
import Swiper from "swiper";
import {Navigation, Parallax, EffectCreative, Pagination} from "swiper/modules"
import "swiper/scss"
import "swiper/scss/pagination"

export default function ourProjectsDetail(): void {
  const projectDetail = Array.from(
    document.querySelectorAll<HTMLDivElement>(".our-projects-detail")
  )

  projectDetail.forEach((element) => {
    const container = element!?.querySelector<HTMLElement>(".swiper")

    const swiperOptions: SwiperOptions = {
      modules: [Navigation, Parallax, EffectCreative, Pagination],
      effect: "creative",
      creativeEffect: {
        prev: {
          translate: [0, 0, -400],
        },
        next: {
          translate: ["105%", 0, 0],
        },
      },
      pagination: {
        el: element.querySelector<HTMLDivElement>(".pagination")
      },
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(".our-projects-detail__arrow--prev"),
        nextEl: element.querySelector<HTMLButtonElement>(".our-projects-detail__arrow--next"),
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

  projectDetail.forEach((element) => {
    const container = element!?.querySelector<HTMLElement>(".swiper")

    if(!container) return
    const counters = container!?.querySelectorAll<HTMLParagraphElement>(".our-projects-detail__counter")

    counters?.forEach((counter) => counter.textContent = `— 0${counters.length}`)
  })
}
