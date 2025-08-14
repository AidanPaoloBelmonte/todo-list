if (module.hot) {
  module.hot.accept();
}

import { formatDistanceToNow } from "date-fns";

class Priority {
  static NORMAL = 0;
  static IMPORTANT = 1;
  static URGENT = 2;

  static isValid(priority) {
    return [Priority.NORMAL, Priority.IMPORTANT, Priority.URGENT].include(
      priority,
    );
  }

  static asString(value) {
    if (Object.values(Priority).includes(value)) {
      return Object.keys(Priority).reduce(function (acc, key) {
        return ((acc[Priority[key]] = key), acc);
      }, {})[value];
    } else return "NORMAL";
  }

  static asValue(str) {
    if (Object.keys(Priority).includes(str)) {
      return Priority[str];
    } else return 0;
  }
}

class TaskList {
  title = "";
  desc = "";
  priority = "";
  category = "";
  duedate = new Date();
  taskGroups = [];

  #id = "";

  constructor(title, duedate, priority = 0, category = "") {
    if (typeof title === "object") {
      if (Object.hasOwn(title, "title")) this.title = title.title;
      else return undefined;
      if (Object.hasOwn(title, "desc")) this.desc = title.desc;
      else return undefined;
      if (Object.hasOwn(title, "priority")) this.desc = title.priority;
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
      this.priority = Priority.asString(priority);
      this.category = category;

      this.taskGroups.push(new TaskGroup("tasks"));

      this.id = crypto.randomUUID();
    }
  }

  toggleTaskCheck(group, index) {
    this.taskGroups[group].toggleTaskCheck(index);
  }

  removeTask(group, index) {
    this.taskGroups[group].removeTask(index);
  }

  addTask(group, desc) {
    this.taskGroups[group].addTask(new Task(desc));
  }

  removeGroup(group) {
    this.taskGroups.splice(group, 1);
  }

  addGroup(title) {
    this.taskGroups.push(new TaskGroup(title));
  }

  isTaskGroupFinished(index) {
    return this.taskGroups[index].areTasksFinished();
  }

  areTasksFinished() {
    return this.taskGroups.every((group) => group.areTasksFinished());
  }

  getFormattedDueDate() {
    return this.duedate.toLocaleDateString(navigator.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  getRemainingTime() {
    return formatDistanceToNow(this.duedate);
  }

  get ID() {
    return this.id;
  }

  save() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }
}

class TaskGroup {
  title = "";
  tasks = [];

  constructor(title) {
    this.title = title;
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
    return this.tasks.every((task) => task.isFinished);
  }
}

class Task {
  desc = "";
  isFinished = false;

  constructor(desc) {
    this.desc = desc;
  }

  toggleCheck() {
    this.isFinished = !this.isFinished;
  }
}

export { TaskList, TaskGroup, Task };
