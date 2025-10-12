import { Project } from "./project";

export function saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}
export function retrieveProjects(){
    let raw = localStorage.getItem("projects");
    if (!raw) return []; // nothing saved yet
    const arr = JSON.parse(raw);
    return arr.map(Project.fromJSON);
}
  
