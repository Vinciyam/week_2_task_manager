
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    addTaskToUI(task);
    saveTaskToLocalStorage(task);

    input.value = "";
}

function addTaskToUI(task) {
    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.className = "task";

    if (task.completed) {
        li.classList.add("completed");
    }

    li.textContent = task.text;

  
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateTaskStatus(task.text);
    });

 
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        li.remove();
        deleteTaskFromLocalStorage(task.text);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTaskToUI);
}


function deleteTaskFromLocalStorage(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function updateTaskStatus(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.text === text) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
