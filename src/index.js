import "normalize.css";
import "./styles.css";
import { Task } from "./task";
import { Project } from "./project";

let store = new Task("errands", "need to head to the store", "tomorrow", "high", "hurry");
console.log(store)
let project = new Project("today");
project.addTask(store)
console.log(project)
