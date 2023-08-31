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
import select from "./select";
import fileUpload from "./fileUpload";
import forms from "./forms";
import tasks from "./tasks";
import showMoreProjects from "./showMoreProjects";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  intro();
  select();
  menu();
  services();
  expertise();
  ourProjects();
  advantages();

  ticker();
  about();
  tasks();
  clients();
  reviews();
  fileUpload();
  forms();
  showMoreProjects();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
