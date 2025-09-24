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
    findTask(id){
        return this.#tasks.find(task => task.id === id ?? null);
    }
    removeTask(id){
        const i = this.#tasks.findIndex(t => t.id === taskId);
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