
function addTask() {
    let input = document.getElementById("taskInput");
    let taskName = input.value.trim();
    let subject = document.getElementById("subjectInput").value;
    let deadline = document.getElementById("deadlineInput").value;

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        name: taskName,
        subject: subject,
        deadline: deadline,
        completed: false
    };

    displayTask(task);

    input.value = "";
    document.getElementById("deadlineInput").value = "";

    saveTasks();
    updateProgress();
}

function displayTask(data) {
    let taskList = document.getElementById("taskList");
    let task = document.createElement("p");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = data.completed;

    checkbox.onchange = function() {
        saveTasks();
        updateProgress();
    };

    let taskText = document.createElement("span");
    taskText.innerText =
        data.name + " | Subject: " + data.subject +
        " | Deadline: " + (data.deadline || "Not set");

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";

    deleteButton.onclick = function() {
        task.remove();
        saveTasks();
        updateProgress();
    };

    task.appendChild(checkbox);
    task.appendChild(taskText);
    task.appendChild(deleteButton);

    taskList.appendChild(task);

    task.dataset.name = data.name;
    task.dataset.subject = data.subject;
    task.dataset.deadline = data.deadline;
}

function updateProgress() {
    let tasks = document.querySelectorAll(
        '#taskList input[type="checkbox"]'
    );

    let completed = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].checked) {
            completed++;
        }
    }

    let total = tasks.length;
    let percentage = 0;

    if (total > 0) {
        percentage = completed / total * 100;
    }

    document.getElementById("percentage").innerText =
        Math.round(percentage) + "% Completed";

    document.getElementById("bar").style.width =
        percentage + "%";

    document.getElementById("count").innerText =
        completed + " of " + total + " tasks completed";
}

function resetTasks() {
    let tasks = document.querySelectorAll(
        '#taskList input[type="checkbox"]'
    );

    for (let i = 0; i < tasks.length; i++) {
        tasks[i].checked = false;
    }

    saveTasks();
    updateProgress();
}

function saveTasks() {
    let tasks = document.querySelectorAll("#taskList p");
    let taskData = [];

    for (let i = 0; i < tasks.length; i++) {
        let checkbox = tasks[i].querySelector("input");

        taskData.push({
            name: tasks[i].dataset.name,
            subject: tasks[i].dataset.subject,
            deadline: tasks[i].dataset.deadline,
            completed: checkbox.checked
        });
    }

    localStorage.setItem("studyTasks", JSON.stringify(taskData));
}

function loadTasks() {
    let savedTasks = localStorage.getItem("studyTasks");

    if (savedTasks !== null) {
        let taskData = JSON.parse(savedTasks);

        for (let i = 0; i < taskData.length; i++) {
            displayTask(taskData[i]);
        }
    }

    updateProgress();
}

loadTasks();
