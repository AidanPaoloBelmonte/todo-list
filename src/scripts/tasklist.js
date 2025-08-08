class tasklist {
  title = "";
  desc = "";
  category = "";
  duedate = new Date();
  taskGroups = [];

  #id = "";

  constructor(title, duedate, duetime) {
    if (typeof title === "object") {
      if (Object.hasOwn(title, "title")) this.title = title.title;
      else return undefined;
      if (Object.hasOwn(title, "desc")) this.desc = title.desc;
      else return undefined;
      if (Object.hasOwn(title, "category")) this.category = title.category;
      else return undefined;
      if (Object.hasOwn(title, "duedate")) this.title = title.duedate;
      else return undefined;
      if (Object.hasOwn(title, "taskGroups"))
        this.taskGroups = title.taskGroups;
      else return undefined;
      if (Object.hasOwn(title, "id")) this.id = title.id;
      else return undefined;
    } else {
      this.title = title;
      this.duedate = duedate;
      this.duetime = duetime;

      this.taskGroups.push(new taskGroup("tasks"));

      this.id = crypto.randomUUID();
    }
  }

  toggleTaskCheck(group, index) {
    this.taskGroups[group].toggleTaskCheck(index);

    save();
  }

  removeTask(group, index) {
    this.taskGroups[group].removeTask(index);
  }

  addTask(group, index) {
    this.taskGroups[group].addTask(index);
  }

  removeGroup(group) {
    this.taskGroups.splice(group, 1);
  }

  addGroup(title) {
    this.taskGroups.push(new taskGroup(title));
  }

  areTasksFinished() {
    return this.taskGroups.every((group) => {
      group.areTasksFinished();
    });
  }

  getRemainingTime() {
    let remaining = new Date().getTime() - this.duedate.getTime();

    return new Date(remaining);
  }

  getID() {
    return this.id;
  }

  save() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }
}

class taskGroup {
  title = "";
  tasks = [];

  constructor(title) {
    this.title = "";
  }

  toggleTaskCheck(index) {
    this.tasks[index].toggleCheck();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
  }

  addTask(task) {
    this.tasks.push(task);
  }

  areTasksFinished() {
    return this.tasks.every((task) => {
      task.isFinished;
    });
  }
}

class task {
  desc = "";
  isFinished = false;

  constructor(desc) {
    this.desc = desc;
  }

  toggleCheck() {
    this.isFinished = !this.isFinished;
  }
}
