import { Project } from "./src/project";
import { Task } from "./src/task";

export function saveProjects(projects) {
    projects.toJSON;
    localStorage.setItem("projects", JSON.stringify(projects));
}
export function retrieveProjects(){
    
}
  
