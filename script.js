function updateProgress() {

    let tasks = document.querySelectorAll(
        'input[type="checkbox"]'
    );

    let completed = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].checked) {
            completed++;
        }
    }

    let percentage = completed / tasks.length * 100;

    document.getElementById("percentage").innerText =
        percentage + "% Completed";

    document.getElementById("bar").style.width =
        percentage + "%";

    document.getElementById("count").innerText =
        completed + " of " + tasks.length +
        " tasks completed";
}

function resetTasks() {

    let tasks = document.querySelectorAll(
        'input[type="checkbox"]'
    );

    for (let i = 0; i < tasks.length; i++) {
        tasks[i].checked = false;
    }

    updateProgress();
}