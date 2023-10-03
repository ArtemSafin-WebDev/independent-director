import "virtual:svg-icons-register";
import "../scss/style.scss";
import menu from "./menu";
import services from "./services";
import expertise from "./expertise";
import ourProjects from "./ourProjects";
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
import ourGoal from "./ourGoal";
import team from "./team";
import history from "./history";
import aboutHeader from "./aboutHeader";
import aboutUs from "./aboutUs";
import ourAdvantage from "./ourAdvantage";
import competencies from "./competencies";
import becomePart from "./becomePart";

import resultBlock from "./resultBlock.ts";
import competitionSlider from "./competition.ts";
import ourProjectsDetail from "./ourProjectsDetail.ts";

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
  ourGoal();
  team();
  history();
  aboutHeader();
  aboutUs();
  ourAdvantage();
  competencies();
  becomePart();

  resultBlock()
  competitionSlider()
  ourProjectsDetail()
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
