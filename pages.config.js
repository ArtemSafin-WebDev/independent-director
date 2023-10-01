import contacts from "./pages-data/contacts";
import home from "./pages-data/home";
import projects from "./pages-data/projects";
import services from "./pages-data/services";
import about from "./pages-data/about";

import projectsDetail from "./pages-data/projects-detail";

const pagesConfig = {
  ...home,
  ...projects,
  ...services,
  ...contacts,
  ...pagesConfig,
  ...about,
  ...projectsDetail
};

export default pagesConfig;
