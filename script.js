
let tasks = [];
let subjects = [];
let time = [];

function addTask() {
    let textField = document.getElementById('addTaskTextField');
    let subject = document.getElementById('addTaskSubject');
    let priority = document.getElementById("addTaskPriority");

    let addTaskBody = document.getElementById('addTaskBody');

    tasks.push(
        {
            "task": textField.value,
            "subject": subject.innerText,
            "priority": priority.innerText
        }
    );

    textField.innerText = "";
    subject.innerText = "Select Subject";
    priority.innerText = "Select Priority";

    let taskHTMl = "";
    tasks.forEach(task => {
        taskHTMl += `
            <div class="row">
                <div class="col">${task.task}</div>
                <div class="col">${task.subject}</div>
                <div class="col">${task.priority}</div>
                <div class="col">
                    <button type="submit" class="btn btn-danger mb-3 mt-3" onclick="removeTask('${task}')"><span class="bi bi-x"></span></button>
                </div>
            </div>    
        
    `
    })

    addTaskBody.innerHTML = taskHTMl;

    console.log(tasks);
    loadAllTasks();
    

}

function addSubject() {
    let textField = document.getElementById('subjectTextField');
    let addSubjectBody = document.getElementById("addSubjectBody");

    subjects.push(
        {
            "subject": textField.value
        }
    );

    textField.value = "";

    let subjectHTML = "";
    subjects.forEach(subject => {
        subjectHTML += `
            <div class="row ps-5 ms-5">
                    <div class="col">${subject.subject}</div>
                    <div class="col">
                        <button type="submit" class="btn btn-danger mb-3 mt-3" onclick="removeSubject('${subject.subject}')"><span class="bi bi-x"></span></button>
                    </div>
            </div>
        `
    });
    addSubjectBody.innerHTML = subjectHTML;
    loadSubjects();

}

function changePriority(priority) {
    let priorityDropDown = document.getElementById('addTaskPriority');
    priorityDropDown.innerHTML = getPriorityText(priority);
}

function changeSubject(subject) {
    console.log(subject);
    
    let subjectButton = document.getElementById('addTaskSubject');
    subjectButton.innerText = subject;

}

function loadSubjects() {
    let subjectMenu = document.getElementById("addTaskSubjectMenu");
    
    subjectMenu.innerHTML = "";
    subjects.forEach(subject => {
        subjectMenu.innerHTML += `
            <li><a class="dropdown-item" onclick="changeSubject('${subject.subject}')" >${subject.subject}</a></li>
        `;
    })
}

function loadAllTasks() {

    let allTaskBody = document.getElementById("allTaskBody");
    allTaskBody.innerHTML = "";

    let sorted = tasks.sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
    
    console.log("SORTED", sorted);
    

    allTaskBody.innerHTML += "<ol>"
    sorted.forEach(task => {
        allTaskBody.innerHTML += `
            
            <li>${task.task} - (${task.priority})</li>    
            
        `;
    });
    allTaskBody.innerHTML += "</ol>";
}

function getPriorityValue(priority) {
    switch (priority.toLowerCase()) {
        case "low":
            return 0;
        case "medium":
            return 1;
        case "high":
            return 2;
        case "very high":
            return 3;
        default:
            return -1;
    }
}

function getPriorityText(index) {
    switch (index) {
        case 0:
            return "Low";
        case 1:
            return "Medium";
        case 2:
            return "High";
        case 3:
            return "Very High";
        default:
            break;
    }
}