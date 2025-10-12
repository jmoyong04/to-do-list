import "normalize.css";
import "./styles.css";
import { Task } from "./task";
import { Project } from "./project";
import { saveProjects } from "./storage";
import { retrieveProjects } from "./storage";
import {addTaskToDom, clearFormAll,  parseForm, 
    displayProject, addProjToList, setCurrentProject, currentProject, removeProject} from "./dom"
let allProjects = retrieveProjects();
let main;
if (allProjects.length === 0) {
    main = new Project("Main");
    setCurrentProject(main);
    displayProject(main);
    addProjToList(main);
    allProjects.push(main);
    saveProjects(allProjects);
  } else {
    // Rebuild sidebar list
    allProjects.forEach(addProjToList);
    // Pick a default current project and display it
    setCurrentProject(allProjects[0]);
    displayProject(currentProject);
  }
  function persist() {
    saveProjects(allProjects);
  }

const newTask = document.querySelector(".add-task-button")
newTask.addEventListener("click", ()=>{
    const toggleForm = document.querySelector(".new-task");
    toggleForm.style.display = "flex";
})
const cancelTask = document.querySelector(".cancel-task");
cancelTask.addEventListener("click", () => {
    const toggleForm = document.querySelector(".new-task");
    toggleForm.style.display = "none";
    clearFormAll(toggleForm)
    
})
const saveTask = document.querySelector(".save-task");
saveTask.addEventListener("click", () => {
    const toggleForm = document.querySelector(".new-task")
    toggleForm.style.display = "none"
    const data = parseForm()
    const newTask = new Task(data.title, data.description, data.dueDate, data.priority);
    currentProject.addTask(newTask)
    addTaskToDom(newTask)
    clearFormAll(toggleForm)
    persist()
})
const newProject = document.querySelector(".add-project-button")
newProject.addEventListener("click", () => {
    const projForm = document.querySelector(".new-project")
    projForm.style.display = "flex"
})
const saveProject = document.querySelector(".confirm-project");
saveProject.addEventListener("click", () => {
    const toggleForm = document.querySelector(".new-project");
    toggleForm.style.display = "none"
    const newProjectName = document.getElementById("new-project-name");
    const newProj = new Project(newProjectName.value);
    allProjects.push(newProj);
    saveProjects(allProjects);
    displayProject(newProj);
    addProjToList(newProj);
    setCurrentProject(newProj);
    newProjectName.value = ""
    persist();
})
const cancelProject = document.querySelector(".cancel-project");
cancelProject.addEventListener("click", () => {
    const projForm = document.getElementById("new-project-name");
    const toggleForm = document.querySelector(".new-project");
    toggleForm.style.display = "none";
    projForm.value = ""
})
const saveChanges = document.querySelector("#save-edit");
saveChanges.addEventListener("click", () => {
    const editForm = document.querySelector(".edit");
    const currentTask = currentProject.findTask(editForm.value)
    editForm.style.display = "none";
    const titleEdit = document.querySelector("#edit-title");
    const editDescription = document.querySelector("#edit-description");
    const editDueDate = document.querySelector("#edit-due-date")
    const editPriority = document.querySelector("#edit-priority");
    currentTask.title = titleEdit.value;
    currentTask.description = editDescription.value;
    currentTask.dueDate = editDueDate.value;
    currentTask.priority = editPriority.value;
    displayProject(currentProject);
    persist();
})
export function goHome(id) {
    // remove from allProjects
    const i = allProjects.findIndex((p) => p.id === id);
    if (i !== -1) {
      allProjects.splice(i, 1);
    }
  
    // choose a fallback project
    if (allProjects.length === 0) {
      const fallback = new Project("Main");
      allProjects.push(fallback);
      addProjToList(fallback);
      setCurrentProject(fallback);
      displayProject(fallback);
    } else {
      setCurrentProject(allProjects[0]);
      displayProject(allProjects[0]);
    }
  
    persist();
  }

