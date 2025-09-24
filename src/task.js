class Task{
    #id = crypto.randomUUID();
    constructor(title, description, dueDate, priority, notes){
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._notes = notes;
    }
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
    
    get notes() {
        return this._notes;
    }
    set notes(newNotes) {
        this._notes = newNotes;
    }
}
export {Task}