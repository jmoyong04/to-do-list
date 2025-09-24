import { Task } from "./task";

class Project{
    #id = crypto.randomUUID();
    #tasks = []
    constructor(name){
        this._name = name;
    }
    get name(){
        return this._name
    }
    set name(newName){
        this._name = newName
    }
    get tasks(){
        return [...this.#tasks];
    }
    get id(){
        return this.#id
    }
    toJSON(){
        return {"name": this._name, "tasks" :this.#tasks.map(t=>t.toJSON()),
            "id" : this.id
        }
    }
    static fromJSON(proj){
        const newProj = new Project (proj.name);
        newProj.#tasks = (proj.tasks ?? []).map(t => Task.fromJSON(t))
        newProj.#id = proj.id
        return newProj
    }
    removeTask(id){
        const i = this.#tasks.findIndex(t => t.id === id);
        if (i === -1) return false;
        this.#tasks.splice(i, 1);
        return true;
    }
    addTask(task){
        if (!task || !task.id) return false;
        if (this.#tasks.some(t => t.id === task.id)) return false;
        this.#tasks.push(task);
        return true;
    }
}
export {Project}