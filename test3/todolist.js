const tasks = [];

const createStatusBtn = (task) => {
  const statusBtn = document.createElement('button');
  statusBtn.textContent = task.status;
  statusBtn.addEventListener('click', () => {
    if (task.status === '作業中') {
      task.status = '完了';
      statusBtn.textContent = '完了';
    } else if (task.status === '完了') {
      task.status = '作業中';
      statusBtn.textContent = '作業中';
    }
  });
  return statusBtn;
};

const createDeleteBtn = (id) => {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '削除';
  deleteBtn.addEventListener('click', () => {
    deleteTask(id);
  });
  return deleteBtn;
};

const createTodoList = (id, name, status) => {
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
  createTodoList(id, name, status);
};

const deleteTask = (id) => {
  tasks.splice(id, 1);
  const taskTable = document.getElementById('todo-list');
  taskTable.innerHTML = '';
  tasks.forEach((task, index) => {
    task.id = index;
    createTodoList(task.id, task.name, task.status);
  });
};
