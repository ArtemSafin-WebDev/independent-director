export default function menu() {
  const burger = document.querySelector<HTMLButtonElement>(
    ".page-header__burger"
  );

  burger?.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.classList.toggle("menu-open");
  });

  const links = Array.from(
    document.querySelectorAll<HTMLLinkElement>(".page-header__nav a")
  );

  links.forEach((link) =>
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
    })
  );
}
