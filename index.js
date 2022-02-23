const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach(todo => {
    addTodo(todo);
  })
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo();
})

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const i = document.createElement("i");

    li.classList.add("todo");
    ul.appendChild(li);

    span.classList.add("task");
    span.innerText = todoText;
    li.appendChild(span);

    i.classList.add("fas", "fa-trash-alt", "fa-lg", "far");
    li.appendChild(i);

    input.value = "";

    if (todo && todo.completed) {
      li.classList.add("check");
    }

    li.addEventListener("click", function () {
      li.classList.toggle("check");
      saveData();
    })

    deleteData();

    saveData();
  }
}

function deleteData() {
  const allIcons = Array.from(document.querySelectorAll("i"));
  const li = document.querySelectorAll("li");

  allIcons.forEach(icon => {
    icon.addEventListener("click", e => {
        const index = allIcons.findIndex(list => list === e.target);

        li[index].remove();
        saveData();
    });
  });
}

function saveData() {
  const lists = document.querySelectorAll("li");
  let todos = [];

  lists.forEach(list => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("check")
    };
    todos.push(todo);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
