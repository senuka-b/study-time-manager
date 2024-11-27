
let tasks = [];
let subjects = [];
let time = [];

let ch;


function loadChart() {
    let ctx = document.getElementById("insightChart");

    if (ch !== undefined) ch.destroy();


    ch = new Chart(ctx, {
        type: 'bar',
        
        data: {
          labels: tasks.map(t => t.task),
          datasets: [{
            label: 'Priority and tasks',
            data: tasks.map(t => getPriorityValue(t.priority)),
            borderWidth: 1,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],

            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
          }],
          
        },
       
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 5,

              ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, ticks) {
                    console.log("value", value);
                    
                    if (value === 1 || value === 2 || value === 3 || value === 4 || value === 5) {

                        return getPriorityText(parseInt(value));
                    }

                    return "";
                }
            }
            }
          }
        }
      });
    ch.ref
}

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
                    <button type="submit" class="btn btn-danger mb-3 mt-3" onclick="removeTask('${task.task}')"><span class="bi bi-x"></span></button>
                </div>
            </div>    
        
    `
    })

    addTaskBody.innerHTML = taskHTMl;

    console.log(tasks);
    loadAllTasks();
    

}

function removeTask(task) {
    console.log(task);
    
    tasks = tasks.filter((t) => t.task != task);
    
    let taskHTMl = "";
    tasks.forEach(task => {
        taskHTMl += `
            <div class="row">
                <div class="col">${task.task}</div>
                <div class="col">${task.subject}</div>
                <div class="col">${task.priority}</div>
                <div class="col">
                    <button type="submit" class="btn btn-danger mb-3 mt-3" onclick="removeTask('${task.task}')"><span class="bi bi-x"></span></button>
                </div>
            </div>    
        
    `
    })

    document.getElementById("addTaskBody").innerHTML = taskHTMl;
    loadAllTasks();
}

function removeSubject(subject) {
    subjects = subjects.filter((s) => s.subject != subject);

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
    document.getElementById("addSubjectBody").innerHTML = subjectHTML;
    loadSubjects();

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
    loadChart();

    let allTaskBody = document.getElementById("allTaskBody");
    allTaskBody.innerHTML = "";

    let sorted = tasks.sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
    
    console.log("SORTED", sorted);
    

    allTaskBody.innerHTML += "<ol>"
    sorted.forEach(task => {
        allTaskBody.innerHTML += `
            
            <li>${task.task} - (${task.priority}) <span class="btn ms-3 btn-success" onclick="removeTask('${task.task}')">Mark as Done<span class="bi bi-check"></span></span></li>    
            
        `;
    });
    allTaskBody.innerHTML += "</ol>";
}

function getPriorityValue(priority) {
    switch (priority.toLowerCase()) {
        case "low":
            return 1;
        case "medium":
            return 2;
        case "high":
            return 3;
        case "very high":
            return 4;
        default:
            return -1;
    }
}

function getPriorityText(index) {
    switch (index) {
        case 1:
            return "Low";
        case 2:
            return "Medium";
        case 3:
            return "High";
        case 4:
            return "Very High";
        default:
            break;
    }
}