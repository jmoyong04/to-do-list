import "normalize.css";
import "./styles.css";
import { Task } from "./task";
import { Project } from "./project";
import { saveProjects } from "../storage";
import { retrieveProjects } from "../storage";

const goals = new Project("goals");
const run = new Task("Go on Run"," hi", "nah", "2", "yes");
const shop = new Task("Shop","23", "3", "23", "3");
goals.addTask(run);
goals.addTask(shop);
const responsibilites = new Project("Responsibilities");
const children = new Task("take care of kids", "ssd", "sdsa", "");
const work = new Task("Go to work", 'eq', "2ewq", "32e", "2131")
responsibilites.addTask(children);
responsibilites.addTask(work);


