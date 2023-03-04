import './style.css';
import todoData from './mod.js';
import isCompleted from './setStates.js';

const todoListEl = document.getElementById('todo-list');
const formEl = document.getElementById('add-todo-form');
const inputEl = document.getElementById('add-task');
const deleteBtnEls = document.getElementsByClassName('delete-btn');
const deleteCompletedBtnEl = document.getElementById('clear-completed-btn');

const renderTasks = () => {
  todoListEl.innerHTML = '';
  todoData.tasksData.forEach((task, forLoopIndex) => {
    const listEl = document.createElement('li');
    listEl.classList.add('list-item');
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.classList.add('checkbox');
    const listDescriptionEl = document.createElement('span');
    listDescriptionEl.classList.add('task-entry');
    listDescriptionEl.innerText = task.description;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    task.index = forLoopIndex + 1;
    listEl.append(checkboxEl, listDescriptionEl, deleteBtn);
    todoListEl.appendChild(listEl);

    if (todoData.tasksData[forLoopIndex].completed) {
      listDescriptionEl.style.textDecoration = 'line-through';
      checkboxEl.checked = true;
    } else {
      listDescriptionEl.style.textDecoration = 'none';
      checkboxEl.checked = false;
    }
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
  isCompleted();
};

renderTasks();

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = {
    description: inputEl.value,
    completed: false,
    index: todoData.tasksData.length + 1,
  };
  todoData.addTaskEntry(task);
  renderTasks();
  inputEl.value = '';
});

// clear all completed task

deleteCompletedBtnEl.addEventListener('click', () => {
  todoData.tasksData = todoData.tasksData.filter((task) => !task.completed);
  todoData.updateLocalStorage();
  renderTasks();
});