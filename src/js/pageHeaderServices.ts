export default function pageHeaderServices() {
  const pageHeader = document.querySelector<HTMLElement>(".page-header");

  const services = document.querySelector<HTMLElement>(
    ".page-header__services"
  );

  if (!pageHeader || !services) return;

  services.addEventListener("mouseenter", () => {
    pageHeader.classList.add("services-shown");
  });

  services.addEventListener("mouseleave", () => {
    pageHeader.classList.remove("services-shown");
  });
}
