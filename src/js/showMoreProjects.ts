import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

export default function showMoreProjects() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".projects-catalog")
  );

  elements.forEach((element) => {
    const btn = element.querySelector<HTMLButtonElement>(
      ".projects-catalog__more-projects"
    );
    const url = element.getAttribute("data-url");
    const list = element.querySelector<HTMLUListElement>(
      ".projects-catalog__list"
    );

    if (!btn || !url || !list) return;

    const controller = new AbortController();
    let page = 1;

    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      btn.disabled = true;

      try {
        const res = await axios.get(url, {
          signal: controller.signal,
          params: {
            page_number: page,
          },
        });

        const data = res.data as string;

        const parser = new DOMParser();
        const nextPageHtml = parser.parseFromString(data, "text/html");
        const nextListItems = Array.from(
          nextPageHtml.querySelectorAll<HTMLLIElement>(
            ".projects-catalog__list-item"
          )
        );
        const nextBtn = nextPageHtml.querySelector<HTMLButtonElement>(
          ".projects-catalog__more-projects"
        );

        if (!nextBtn) btn.style.display = "none";

        if (nextListItems) {
          list?.append(...nextListItems);
          gsap.fromTo(
            nextListItems,
            {
              autoAlpha: 0,
            },
            {
              duration: 0.4,
              autoAlpha: 1,
              stagger: 0.1,
              ease: "power2.out",
              clearProps: "all",
            }
          );
        }

        page++;

        ScrollTrigger.refresh();
      } catch (err) {
        console.error(err);
        return;
      } finally {
        btn.disabled = false;
      }
    });
  });
}
