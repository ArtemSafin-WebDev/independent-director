import { debounce } from "lodash";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIMATION_START } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function services() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".services")
  );

  elements.forEach((element) => {
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".services__card")
    );
    const setInlineSize = () => {
      cards.forEach((card) => {
        const title = card.querySelector<HTMLHeadingElement>(
          ".services__card-title"
        );
        if (title) {
          card.style.setProperty("--inline-size", title?.offsetWidth + "px");
        }
      });
    };

    setInlineSize();

    window.addEventListener("resize", debounce(setInlineSize, 300));

    const heading = element.querySelector<HTMLElement>(
      ".services__small-heading"
    );

    const cardHeadings = Array.from(
      element.querySelectorAll(".services__card-title-wrapper")
    );

    const innerHeadings = Array.from(
      element.querySelectorAll(".services__card-title-wrapper-inner")
    );

    const learnMore = element.querySelector(".services__learn-more");

    let mm = gsap.matchMedia();

    mm.add("(min-width: 641px)", () => {
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
      )
        .fromTo(
          cards,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 1,
            ease: "power1.out",
            stagger: 0.2,
          },
          "<"
        )
        .fromTo(
          cardHeadings,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 1,
            ease: "power1.out",
            stagger: 0.2,
          },
          "<"
        )
        .fromTo(
          innerHeadings,
          {
            autoAlpha: 0,
            yPercent: 100,
          },
          {
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            yPercent: 0,
          },
          "<"
        )
        .fromTo(
          learnMore,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.4,
          },
          ">-=0.5"
        );
    });
  });
}
