const tasks = [];

const createDeleteBtn = (id) => {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '削除';
  deleteBtn.addEventListener('click', () => {
    deleteTask(id);
  });
  return deleteBtn;
};

const createTaskItem = (id, name, status) => {
  const taskTable = document.getElementById('todo-list');
  const newRow = taskTable.insertRow();

  const idCell = newRow.insertCell();
  const taskNameCell = newRow.insertCell();
  const statusCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  const task = { id: id, name: name, status: status };
  const statusBtn = createStatusBtn(task);
  const deleteBtn = createDeleteBtn(id);

  idCell.textContent = id;
  taskNameCell.textContent = name;
  statusCell.appendChild(statusBtn);
  deleteCell.appendChild(deleteBtn);
};

const addTask = () => {
  const input = document.getElementById('add-task');
  const name = input.value;
  input.value = '';

  const id = tasks.length;
  const status = '作業中';

  tasks.push({ id: id, name: name, status: status });
  createTaskItem(id, name, status);
};

const deleteTask = (id) => {
  tasks.splice(id, 1);
  const taskTable = document.getElementById('todo-list');
  taskTable.innerHTML = '';
  showTasks();
};

const showTasks = () => {
  const tabList = document.forms.list.tab;
  const taskTable = document.getElementById('todo-list');
  taskTable.innerHTML = '';

  if (tabList[0].checked) {
    tasks.forEach((task, index) => {
      task.id = index;
      createTaskItem(task.id, task.name, task.status);
    });
    return;
  }

  if (tabList[1].checked) {
    const workingTasks = tasks.filter((task) => task.status === '作業中');
    workingTasks.forEach((task, index) => {
      task.id = index;
      createTaskItem(task.id, task.name, task.status);
    });
    return;
  }

  if (tabList[2].checked) {
    const doneTasks = tasks.filter((task) => task.status === '完了');
    doneTasks.forEach((task, index) => {
      task.id = index;
      createTaskItem(task.id, task.name, task.status);
    });
    return;
  }

  tasks.forEach((task, index) => {
    task.id = index;
    createTaskItem(task.id, task.name, task.status);
  });
};

const createStatusBtn = (task) => {
  const statusBtn = document.createElement('button');
  statusBtn.textContent = task.status;
  statusBtn.addEventListener('click', () => {
    tasks[task.id].status === '作業中'
      ? (tasks[task.id].status = '完了')
      : (tasks[task.id].status = '作業中');
    showTasks();
  });
  return statusBtn;
};

const tabList = document.forms.list.tab;

tabList[0].addEventListener('change', () => showTasks());
tabList[1].addEventListener('change', () => showTasks());
tabList[2].addEventListener('change', () => showTasks());
