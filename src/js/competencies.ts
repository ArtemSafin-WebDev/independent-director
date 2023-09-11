import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIMATION_START } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function competencies() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".competencies")
  );

  elements.forEach((element) => {
    const heading = element.querySelector<HTMLElement>(
      ".services__small-heading"
    );
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".competencies__list-item")
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
        duration: 0.6,

        stagger: 0.3,
        y: 0,
      },
      "<"
    );
  });
}
