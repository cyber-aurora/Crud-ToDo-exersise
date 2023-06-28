let todos = [];

const addForm = document.getElementById('add-form');
const todoList = document.getElementById('todo-list');

addForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const name = nameInput.value;
  if (name) {
    addTodoItem(name);
    nameInput.value = '';
  }
});

function addTodoItem(name) {
  const id = Date.now().toString();

  const todo = {
    id: id,
    name: name
  };

  todos.push(todo);

  renderTodoItem(todo);
}

function renderTodoItem(todo) {
  const listItem = document.createElement('li');
  listItem.setAttribute('data-id', todo.id);

  const nameSpan = document.createElement('span');
  nameSpan.textContent = todo.name;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    deleteTodoItem(todo.id);
  });

  const updateButton = document.createElement('button');
  updateButton.textContent = 'Update';
  updateButton.addEventListener('click', function() {
    updateTodoItem(todo.id);
  });

  listItem.appendChild(nameSpan);
  listItem.appendChild(updateButton);
  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);
}

function deleteTodoItem(id) {
  const index = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  todos.splice(index, 1);

  const listItem = document.querySelector(`li[data-id="${id}"]`);
  todoList.removeChild(listItem);
}

function updateTodoItem(id) {
  const listItem = document.querySelector(`li[data-id="${id}"]`);
  const nameSpan = listItem.querySelector('span');

  const newName = prompt('Enter the new name:');
  if (newName) {
    nameSpan.textContent = newName;
    const index = todos.findIndex(function(todo) {
      return todo.id === id;
    });
    todos[index].name = newName;
  }
}

