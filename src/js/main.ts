import "virtual:svg-icons-register";
import "../scss/style.scss";
import menu from "./menu";
import services from "./services";
import expertise from "./expertise";
import ourProjects from "./our-projects";
import advantages from "./advantages";
import smoothScrolling from "./smoothScrolling";
import reviews from "./reviews";
import ticker from "./ticker";
import intro from "./intro";
import about from "./about";
import clients from "./clients";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  intro();
  menu();
  services();
  expertise();
  ourProjects();
  advantages();
  reviews();
  ticker();
  about();
  clients();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
