import './style.css';

const tasksData = [
  {
    description: 'task 1',
    completed: false,
    index: 0,
  },
  {
    description: 'task 2',
    completed: false,
    index: 0,
  },
  {
    description: 'task 3',
    completed: false,
    index: 0,
  },
];

const todoListEl = document.getElementById('todo-list');

const renderTasks = () => {
  tasksData.forEach((task, forLoopIndex) => {
    const listEl = document.createElement('li');
    listEl.classList.add('list-item');
    listEl.innerText = task.description;
    task.index = forLoopIndex;
    todoListEl.appendChild(listEl);
  });
};

renderTasks(tasksData);