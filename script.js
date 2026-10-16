
function addTask() {

    let input = document.getElementById("taskInput");
    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let task = document.createElement("p");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = updateProgress;

    let taskText = document.createElement("span");
    taskText.innerText = " " + taskName + " ";

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";

    deleteButton.onclick = function() {
        task.remove();
        updateProgress();
    };

    task.appendChild(checkbox);
    task.appendChild(taskText);
    task.appendChild(deleteButton);

    taskList.appendChild(task);

    input.value = "";

    updateProgress();
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

    updateProgress();
}
