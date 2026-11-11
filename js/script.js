
// ==========================================
// 1. GREETER APPLICATION
// ==========================================

const nameInput = document.getElementById("nameInput");
const greetBtn = document.getElementById("greetBtn");
const greetingOutput = document.getElementById("greetingOutput");

greetBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();

    if (name === "") {
        greetingOutput.textContent = "Please enter your name!";
    } else {
        greetingOutput.textContent = "Hello, " + name + "! Welcome!";
    }
});


// ==========================================
// 2. COUNTER APPLICATION
// ==========================================

let count = 0;

const countDisplay = document.getElementById("count");
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");
const resetBtn = document.getElementById("resetBtn");

function updateCounter() {
    countDisplay.textContent = count;
}

increaseBtn.addEventListener("click", function () {
    count++;
    updateCounter();
});

decreaseBtn.addEventListener("click", function () {
    count--;
    updateCounter();
});

resetBtn.addEventListener("click", function () {
    count = 0;
    updateCounter();
});


// ==========================================
// 3. COLOR AND THEME CHANGER
// ==========================================

const colorButtons = document.querySelectorAll(".color-btn");
const themeToggle = document.getElementById("themeToggle");

colorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedColor = button.dataset.color;

        document.body.style.backgroundColor = selectedColor;
    });
});

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});


// ==========================================
// 4. TODO LIST APPLICATION
// ==========================================

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const clearCompletedBtn = document.getElementById("clearCompletedBtn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodoCounts() {
    const total = todos.length;

    const completed = todos.filter(function (todo) {
        return todo.completed;
    }).length;

    const pending = total - completed;

    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach(function (todo) {
        const li = document.createElement("li");

        if (todo.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;

        const actions = document.createElement("div");
        actions.className = "todo-actions";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = todo.completed ? "Undo" : "Complete";
        completeBtn.dataset.action = "toggle";
        completeBtn.dataset.id = todo.id;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.dataset.action = "delete";
        deleteBtn.dataset.id = todo.id;

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        todoList.appendChild(li);
    });

    updateTodoCounts();
}

function addTodo() {
    const taskText = todoInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTodo = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        text: taskText,
        completed: false
    };

    todos.push(newTodo);

    saveTodos();
    renderTodos();

    todoInput.value = "";
    todoInput.focus();
}

addTodoBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

// Event Delegation: One listener handles all Todo buttons.
todoList.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");

    if (!button || !todoList.contains(button)) {
        return;
    }

    const todoId = button.dataset.id;
    const action = button.dataset.action;

    if (action === "toggle") {
        todos = todos.map(function (todo) {
            if (todo.id === todoId) {
                return {
                    ...todo,
                    completed: !todo.completed
                };
            }

            return todo;
        });
    }

    if (action === "delete") {
        todos = todos.filter(function (todo) {
            return todo.id !== todoId;
        });
    }

    saveTodos();
    renderTodos();
});

clearCompletedBtn.addEventListener("click", function () {
    todos = todos.filter(function (todo) {
        return !todo.completed;
    });

    saveTodos();
    renderTodos();
});

// Restore saved tasks when the page loads.
renderTodos();


// ==========================================
// 5. FAMILY TREE EXPLORER
// ==========================================

const familyMembers = document.querySelectorAll(".family-member");
const familyInfo = document.getElementById("familyInfo");

familyMembers.forEach(function (member) {
    member.addEventListener("click", function () {
        const name = member.dataset.name;
        const info = member.dataset.info;

        familyInfo.textContent = name + ": " + info;
    });
});


// ==========================================
// 6. APPLICATION INITIALIZATION
// ==========================================

console.log("Class 14 DOM Applications Loaded Successfully!");
console.log("JavaScript Connected Successfully!");