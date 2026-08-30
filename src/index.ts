// const btn = document.getElementById("btn")! as HTMLButtonElement;
// const input = document.getElementById("todoinput")! as HTMLInputElement;
// const form = document.querySelector("form")!;
// const list = document.getElementById("todolist");

// function handleSubmit(e: SubmitEvent) {
//   e.preventDefault();
//   const newTodoText = input.value;
//   const newLI = document.createElement("li");
//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";

//   newLI.append(newTodoText);
//   newLI.append(checkbox);
//   list?.append(newLI);
// }

// form.addEventListener("submit", handleSubmit);

interface Todo {
  text: string;
  completed: boolean;
}

const btn = document.getElementById("btn")! as HTMLButtonElement;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist");
const todos: Todo[] = readTodos();
todos.forEach(createTodo);

function readTodos(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON === null) return [];
  else return JSON.parse(todosJSON);
}

function handleSubmit(e: SubmitEvent) {
  e.preventDefault();

  if (!input.value) {
    input.placeholder = "value is empty";
    input.style.cssText = "border: 1px solid red";
    return;
  } else {
    input.style.cssText = "style: inset";
  }

  const newTodo: Todo = {
    text: input.value,
    completed: false,
  };

  createTodo(newTodo);
  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));

  updateTodos();
  input.value = "";
}

function updateTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodo(todo: Todo) {
  // const newTodoText = input.value;
  const newLI = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;
    updateTodos();
  });

  newLI.append(todo.text);
  newLI.append(checkbox);
  list?.append(newLI);
}

form.addEventListener("submit", handleSubmit);
