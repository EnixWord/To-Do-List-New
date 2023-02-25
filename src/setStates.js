import todoData from './mod.js';

const isCompleted = () => {
  const taskEntryEls = document.querySelectorAll('.list-item');
  const taskEntryArray = Array.from(taskEntryEls);
  taskEntryArray.forEach((taskEntry, i) => {
    taskEntry.children[0].addEventListener('change', () => {
      if (taskEntry.children[0].checked) {
        taskEntry.children[1].style.textDecoration = 'line-through';
        todoData.tasksData[i].completed = true;
        todoData.updateLocalStorage();
      } else {
        taskEntry.children[1].style.textDecoration = 'none';
        todoData.tasksData[i].completed = false;
        todoData.updateLocalStorage();
      }
    });
  });
};
export default isCompleted;