import contacts from "./pages-data/contacts";
import home from "./pages-data/home";
import projects from "./pages-data/projects";
import services from "./pages-data/services";

const pagesConfig = {
  ...home,
  ...projects,
  ...services,
  ...contacts,
};

export default pagesConfig;
