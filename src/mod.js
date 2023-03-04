class TodoData {
  constructor() {
    this.tasksData = JSON.parse(window.localStorage.getItem('tasksData')) || [];
  }

  addTaskEntry = (task) => {
    this.tasksData.push(task);
    this.updateLocalStorage();
  };

  deleteTaskEntry = (index) => {
    this.tasksData = this.tasksData.filter((task) => task.index !== index);
    this.updateLocalStorage();
  };

  updateLocalStorage = () => {
    localStorage.setItem('tasksData', JSON.stringify(this.tasksData));
    this.tasksData = JSON.parse(window.localStorage.getItem('tasksData'));
  };
}

const todoData = new TodoData();

export default todoData;
