import infoButton from "./text.svg";
import remove from "./close-thick.svg";
import { goHome, persist } from ".";
export let currentProject = null;

export function setCurrentProject(proj) {
  currentProject = proj;
}
export function addTaskToDom(task) {
  let projectArea = document.querySelector(".project-body");
  let taskDiv = document.createElement("div");
  let header = document.createElement("h3");
  let info = document.createElement("div");
  let desc = document.createElement("p");
  let due = document.createElement("p");
  let icons = document.createElement("div");
  let complete = document.createElement("input");
  complete.type = "checkbox";
  let notesButton = document.createElement("img");
  let removeButton = document.createElement("img");
  taskDiv.classList.add("task");
  switch (task.priority) {
    case "High":
      taskDiv.style.borderColor = "red";
      break;
    case "Medium":
      taskDiv.style.borderColor = "yellow";
      break;
    case "Low":
      taskDiv.style.borderColor = "green";
      break;
  }
  info.classList.add("description");
  icons.classList.add("icons");
  notesButton.src = infoButton;
  notesButton.alt = "notes button";
  notesButton.classList.add("notes-button");
  notesButton.value = task.id;
  notesButton.addEventListener("click", () => {
    const editForm = document.querySelector(".edit");
    editForm.value = task.id;
    editForm.style.display = "flex";
    document.getElementById("edit-title").value = task.title;
    document.getElementById("edit-description").value = task.description;
    document.getElementById("edit-due-date").value = task.dueDate;
    document.getElementById("edit-priority").value = task.priority;
  });
  removeButton.src = remove;
  removeButton.alt = "remove button";
  removeButton.classList.add("remove-button");
  removeButton.value = task.id;
  removeButton.addEventListener("click", (e) => {
    currentProject.removeTask(e.target.value);
    persist();
    displayProject(currentProject);
  });
  header.textContent = task.title;
  desc.textContent = task.description;
  due.textContent = "Due: " + task.dueDate;
  icons.appendChild(complete);
  icons.appendChild(notesButton);
  icons.appendChild(removeButton);
  info.appendChild(desc);
  info.appendChild(due);
  info.appendChild(icons);
  taskDiv.appendChild(header);
  taskDiv.appendChild(info);
  projectArea.appendChild(taskDiv);
}
export function displayProject(project) {
  const removeProj = document.createElement("img");
  removeProj.classList.add("remove-project-button");
  removeProj.src = remove;
  removeProj.dataset.projectId = project.id;
  const title = document.querySelector(".project-title");
  const grid = document.querySelector(".project-body");
  removeProj.addEventListener("click", (e) => {
    const id = e.currentTarget.dataset.projectId; // safer than target.value
    removeProject(id);
  });
  title.innerHTML = "";
  title.appendChild(removeProj);
  title.append(`${project.name}`);
  grid.innerHTML = "";
  const allTasks = project.tasks;
  allTasks.forEach((task) => {
    addTaskToDom(task);
  });
}
export function addProjToList(project) {
  const listDisplay = document.querySelector(".project-list");
  const projButton = document.createElement("li");
  projButton.dataset.projectId = project.id;
  projButton.textContent = project.name;
  projButton.addEventListener("click", () => {
    displayProject(project);
    setCurrentProject(project);
  });
  listDisplay.appendChild(projButton);
}
export function removeProject(id) {
  const item = document.querySelector(`li[data-project-id="${id}"]`);
  if (item.textContent === "Main") {
    return;
  }
  item.remove();
  goHome(id);
}
export function parseForm() {
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const dueDate = document.querySelector("#due-date");
  const priority = document.querySelector("#priority");
  return {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    priority: priority.value,
  };
}
export function clearFormAll(form) {
  form.querySelectorAll("input, textarea, select").forEach((e) => {
    if (e.tagName === "SELECT") {
      e.selectedIndex = 0;
    } else {
      e.value = "";
    }
  });
}
