class Task{
    #id = crypto.randomUUID();
    constructor(title, description, dueDate, priority, notes){
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._notes = notes
        this._completed = false;
    }
    toggleComplete() { this.completed = !this.completed; }
    get id(){
        return this.#id
    }
    get title() {
        return this._title;
    }
    set title(newTitle) {
        this._title = newTitle;
    }
    
    get description() {
        return this._description;
    }
    set description(newDescription) {
        this._description = newDescription;
    }
    
    get dueDate() {
        return this._dueDate;
    }
    set dueDate(newDueDate) {
        this._dueDate = newDueDate;
    }
    
    get priority() {
        return this._priority;
    }
    set priority(newPriority) {
        this._priority = newPriority;
    }

    ToJSON(){
        return {"title" : this._title, "description": this._description, 
            "dueDate" : this._dueDate, "priority" : this._priority, "notes" : this._notes, "id" : this.#id}
    }
    static fromJSON(task){
        const newTask = new Task(task.title, task.description, task.dueDate, task.priority, task.notes);
        newTask.#id = task.id;
        newTask.completed = !!task.completed;
        return newTask;
    }

}
export {Task}