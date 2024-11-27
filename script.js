
let tasks = [];
let subjects = [];
let time = [];

let ch;
let th;

tasks = [
    {task: "Task 01", subject: "Maths", priority: "Medium"},
    {task: "Task 02", subject: "Science", priority: "Very High"},
    {task: "Task 03", subject: "English", priority: "High"},
]

subjects = [
    {subject: "Science"},
    {subject: "Maths"},
    {subject: "English"},
]

time = [
    {task: "Task 01", duration: "12:01"},
    {task: "Task 02", duration: "9:32"},
    {task: "Task 03", duration: "2:32"},
]



loadAll();

function loadAll() {
    loadAllTasks();
    loadSubjects();
    loadChart();
    loadTimeChart();
}

function loadTimeChart() {
    let ctx = document.getElementById("timeChart");

    if (th !== undefined) th.destroy();


    th = new Chart(ctx, {
        type: 'line',
        
        data: {
          labels: subjects.map(sub => sub.subject),
          datasets: [{
            label: 'Time spent on subjects',
            data: time.map(t =>{ 
                console.log(parseFloat(t.duration.split(":")[0]));
                
                return parseFloat(t.duration.split(":")[0])}),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }],
          
        },
       
        options: {
          scales: {
            y: {
              beginAtZero: true,

            }
          }
        }
      });
}

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
    time = time.filter((t) => t.task != task);
    
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
    loadChart();
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
    loadTimeChart();

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
    let addSubjectBody = document.getElementById("addSubjectBody");
    
    subjectMenu.innerHTML = "";
    subjects.forEach(subject => {
        subjectMenu.innerHTML += `
            <li><a class="dropdown-item" onclick="changeSubject('${subject.subject}')" >${subject.subject}</a></li>
        `;
    })

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
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let addTaskBody = document.getElementById("addTaskBody");

    taskList.innerHTML = "";
    tasks.forEach(task => {
        taskList.innerHTML += `<li><a class="dropdown-item" onclick=selectTask('${task.task}')>${task.task}</a></li>` 
    })

    let taskTimeBody = document.getElementById("taskTimeBody");

    taskTimeBody.innerHTML = "";
    time.forEach(t => {
        taskTimeBody.innerHTML += `
            <div class="col">${t.task}</div>
            <div class="col">${t.duration}</div>
            <div class="col">
                <button type="submit" class="btn btn-danger mb-3 mt-3" onclick="removeTask('${t.task}')"><span class="bi bi-x"></span></button>
            </div>
        
        `;
    })

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

}

function addTime() {
    let timeStart = document.getElementById('timeStart');
    let timeEnd = document.getElementById('timeEnd');

    let task = document.getElementById("selectTask");
    let taskTimeBody = document.getElementById("taskTimeBody");

    if (time.find(t => t.task == task.innerText)) {
        return alert("Sorry! You have already allocated a time for this task.")
    }

    time.push(
        {
            "task": task.innerText,
            "duration": diff(timeStart.value, timeEnd.value)
        }
    );

    taskTimeBody.innerHTML = "";
    time.forEach(t => {
        taskTimeBody.innerHTML += `
        <div class="row d-flex text-center justify-content-center align-items-center">
            <div class="col">${t.task}</div>
            <div class="col">${t.duration}</div>
            <div class="col">
                <button type="submit" class="btn btn-danger mb-3 mt-3" onclick="removeTask('${t.task}')"><span class="bi bi-x"></span></button>
            </div>
                                            
        </div>
        
        `;
    })

    loadTimeChart();

    
}

function diff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0)
       hours = hours + 24;

    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
}
  

function selectTask(task) {
    let selectTask = document.getElementById("selectTask");

    selectTask.innerText = task;
}

function loadAllTasks() {
    loadChart();
    loadTasks();
    loadTimeChart();
    

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

    let taskTimeBody = document.getElementById("taskTimeBody");

    taskTimeBody.innerHTML = "";
    time.forEach(t => {
        taskTimeBody.innerHTML += `
        <div class="row d-flex text-center justify-content-center align-items-center">
            <div class="col">${t.task}</div>
            <div class="col">${t.duration}</div>
            <div class="col">
                <button type="submit" class="btn btn-danger mb-3 mt-3" onclick="removeTime('${t.task}')"><span class="bi bi-x"></span></button>
            </div>
                                            
        </div>
        
        `;
    })
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