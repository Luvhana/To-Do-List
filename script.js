const addProjectbtn = document.querySelector(".addProjectbtn");
const addTaskbtn = document.querySelector(".addTaskbtn");
const formContainer = document.getElementById("project-form");
const projectdialog = document.getElementById("project-dialog");
const dialogCancelBtn = document.getElementById("cancel-btn");
const projectform = document.getElementById("project-form");
const select = document.getElementById("projects");
const taskform = document.getElementById("task-form");
const taskdialog = document.getElementById("task-dialog");
const taskCancelBtn = document.getElementById("taskCancelBtn");

addProjectbtn.addEventListener("click",()=>{
    projectdialog.showModal();
});
projectform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const name = document.getElementById("project-name").value;
    projects.push(new Project(name));
    projectform.reset();
    renderProjects();
    renderProjectOptions();
    projectdialog.close();
})

addTaskbtn.addEventListener("click",()=>{
    taskdialog.showModal();
});
taskform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const taskName = document.getElementById("task-name").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;
    const selectedIndex = select.value;
    const selectedProject = projects[selectedIndex];
    const newTodo = new Todo(taskName, description, dueDate, priority);
    selectedProject.addTodo(newTodo);
    console.log(selectedProject)
    taskform.reset();
    taskdialog.close();
})

dialogCancelBtn.addEventListener("click",()=>{
    console.log("cancelled!")
    projectdialog.close();
})
taskCancelBtn.addEventListener("click",()=>{
    taskdialog.close();
})

class Todo{
    constructor(title,description,dueDate,priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

}

class Project{
    constructor(name){
        this.name = name;
        this.todos = [];
    }
    addTodo(todo){
        this.todos.push(todo);
    }
}

const projects = [];
const defaultProject = new Project("Default");
const work = new Project("Work");
projects.push(work);
projects.push(defaultProject);

const t1 = new Todo("Study","JS classes", "2026-04-25","High");
defaultProject.addTodo(t1);
console.log(projects);


function renderProjects(){
    const projectList = document.querySelector(".project-List");

    projectList.innerHTML = "";
    projects.forEach((project)=>{
        const btn = document.createElement("button");
        btn.textContent = project.name;
        btn.classList.add("projects");
        projectList.appendChild(btn);
    });
}

function renderProjectOptions(){
    select.innerHTML="";
    projects.forEach((project,index)=>{
        const option = document.createElement("option");
        option.value = index;
        option.textContent = project.name;

        select.appendChild(option);
    });
}

renderProjects();
renderProjectOptions();
