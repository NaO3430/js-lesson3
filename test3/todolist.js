const tasks = [];

const createStatusBtn = () => {
  const statusBtn = document.createElement('button');
  statusBtn.textContent = '作業中';
  return statusBtn;
};

const createDeleteBtn = () => {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '削除';
  return deleteBtn;
};

const createTodoList = (id, name) => {
  const taskTable = document.getElementById('todo-list');
  const newRow = taskTable.insertRow();

  const idCell = newRow.insertCell();
  const taskNameCell = newRow.insertCell();
  const statusCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  const statusBtn = createStatusBtn();
  const deleteBtn = createDeleteBtn();

  idCell.textContent = id;
  taskNameCell.textContent = name;
  statusCell.appendChild(statusBtn);
  deleteCell.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', () => {
    deleteTask(id);
  });
};

const addTask = () => {
  const input = document.getElementById('add-task');
  const name = input.value;
  input.value = '';

  const id = tasks.length;

  tasks.push({ id: id, name: name, status: '作業中' });
  createTodoList(id, name);
};

const deleteTask = (id) => {
  tasks.splice(id, 1);
  const taskTable = document.getElementById('todo-list');
  taskTable.innerHTML = '';
  tasks.forEach((task, index) => {
    task.id = index;
    createTodoList(task.id, task.name);
  });
};
