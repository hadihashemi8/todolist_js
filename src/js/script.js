

const $ = document;


// working with todoList

let todoInput = $.getElementById("todo-input");
let todoBgcolor = $.getElementById("todo-bgcolor");
let todosContainer = $.getElementById("todos-container");
const addTodoBtn = $.getElementById("add-todo-btn");

let todosArray = [];

addTodoBtn.addEventListener("click", () => {
  if (!todoInput.value == "") {
    addTodo();
  }
});


todoInput.addEventListener("keyup", (e) => {
  if (e.keyCode == 13 && !todoInput.value == "") {
    addTodo();
  }
});


function addTodo() {
  let todoObj = {
    id: todosArray.length + 1,
    todo: todoInput.value,
    todoBgColor: todoBgcolor.value,
    iscomplate : false
  };

  todosArray.push(todoObj);
  setToLocal(todosArray);
  createTodo(todosArray);
  todoInput.value = "";
}


function createTodo(todos) {
  todosContainer.innerHTML = "";
  todos.forEach((todo) => {
    todosContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="  my-2 p-4 flex flex-row-reverse justify-between rounded-sm todoContainer" style="background-color:${todo.todoBgColor} ;">
      <h1 class="text-white ">${todo.todo}</h1>
      <div >
          <i class="fas fa-trash mx-2 cursor-pointer  hover:text-secondry-Color border-2 p-1 rounded-md border-transparent hover:border-white transition-all duration-200 remove-btn"  onclick="removeTodo(${todo.id})"></i>
          <i class="fas fa-check mx-2 cursor-pointer  hover:text-btn-Color border-2 p-1 rounded-md border-transparent hover:border-white transition-all duration-200 complate-btn" onclick="complateTodo(${todo.id})"></i>
      </div>
    </div>`
    );
    let b = $.querySelectorAll('.todoContainer')
if(todo.iscomplate){
 b[todo.id - 1].classList.add('complate')
}

  });
 
}


// set to localstorage
function setToLocal(todos) {
  localStorage.setItem("todo", JSON.stringify(todos));
}


function getFromLocal() {
  let getTodo = JSON.parse(localStorage.getItem("todo"));

  if (getTodo) {
    todosArray = getTodo;
  }
  createTodo(todosArray);
}


window.addEventListener("load", () => {
  getFromLocal();
});


// todo remove part
function removeTodo(id) {
  let getLocal = JSON.parse(localStorage.getItem("todo"));

  todosArray = getLocal;

  let findTodo = todosArray.findIndex((todo) => {
    return todo.id == id;
  });
  todosArray.splice(findTodo, 1);

  createTodo(todosArray);
  setToLocal(todosArray);
}


// iscomplate part
function complateTodo(id){
  let getLocal = JSON.parse(localStorage.getItem("todo"));

  todosArray = getLocal;

  let x = todosArray.find(item => {
    return item.id == id
  })

  x.iscomplate = !x.iscomplate
 
createTodo(todosArray)
setToLocal(todosArray)



}


//filter part
let filterBox = $.querySelector('.filter-part')

filterBox.addEventListener('change' , () => {
 if(filterBox.value == 'complate'){
  
   let x = todosArray.filter((item) => {
      return item.iscomplate == true
   })

   createTodo(x)
   
  }else if(filterBox.value == 'uncomplate'){
   let x = todosArray.filter((item) => {
      return item.iscomplate == false
   })

   createTodo(x)

 }else if(filterBox.value == 'filter'){
createTodo(todosArray)
 }
})



// dark mode part
const switchTheme = $.getElementById("moon-icon");

const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches;

function iconToggle() {
  switchTheme.classList.toggle("fa-sun");
}

function themeCheck() {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    $.documentElement.classList.add("dark");
    switchTheme.classList.replace("fa-moon", "fa-sun");

    return;
  }

  switchTheme.classList.replace("fa-sun", "fa-moon");
}

function themeSwitch() {
  if ($.documentElement.classList.contains("dark")) {
    $.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle();
    return;
  }
  $.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle();
}

switchTheme.addEventListener("click", () => {
  themeSwitch();
});

themeCheck();
