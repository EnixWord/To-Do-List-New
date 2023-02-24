import './style.css';

class TodoData {
  constructor() {
    if (window.localStorage.getItem('tasksData') !== undefined) {
      this.tasksData = JSON.parse(window.localStorage.getItem('tasksData'));
    } else {
      this.tasksData = [];
    }
  }

  addTaskEntry(task) {
    this.tasksData.push(task);
    this.updateLocalStorage();
  }

  deleteTaskEntry(index) {
    this.tasksData = this.tasksData.filter((task) => task.index !== index);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('tasksData', JSON.stringify(this.tasksData));
    this.tasksData = JSON.parse(window.localStorage.getItem('tasksData'));
  }
}

const todoData = new TodoData();
const todoListEl = document.getElementById('todo-list');
const formEl = document.getElementById('add-todo-form');
const inputEl = document.getElementById('add-task');
const deleteBtnEls = document.getElementsByClassName('delete-btn');

const renderTasks = () => {
  todoListEl.innerHTML = '';
  todoData.tasksData.forEach((task, forLoopIndex) => {
    const listEl = document.createElement('li');
    listEl.classList.add('list-item');
    const listDescriptionEl = document.createElement('span');
    listDescriptionEl.classList.add('task-entry');
    listDescriptionEl.innerText = task.description;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    task.index = forLoopIndex + 1;
    listEl.append(listDescriptionEl, deleteBtn);
    todoListEl.appendChild(listEl);
  });

  const deleteBtns = Array.from(deleteBtnEls);
  deleteBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const index = i + 1;
      todoData.deleteTaskEntry(index);
      todoData.tasksData.forEach((task, i) => {
        task.index = i + 1;
      });
      todoData.updateLocalStorage();
      renderTasks();
    });
  });
};

renderTasks();

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = {
    description: inputEl.value,
    completed: false,
    index: todoData.tasksData.length,
  };
  todoData.addTaskEntry(task);
  renderTasks();
});
