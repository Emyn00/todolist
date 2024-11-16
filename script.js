const button = document.getElementById("button");
const cont = document.getElementById("taskCont")
const input = document.getElementById("input")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const rearrangeTask = () => {
    cont.innerHTML = ""
    tasks.forEach((taskObject) => {
        const task = createElements(taskObject)
        cont.appendChild(task)

    })
}

const deleteTask = (taskObject) => {
    if (tasks.indexOf(taskObject) > -1) {
        tasks.splice(tasks.indexOf(taskObject), 1);
        localStorage.setItem("tasks", JSON.stringify(tasks))
        rearrangeTask();
    }
};

const markTask = (taskObject) => {
    if (tasks.indexOf(taskObject) > -1) {
        tasks[tasks.indexOf(taskObject)].isDone = true
        tasks.push(tasks.splice(tasks.indexOf(taskObject), 1)[0]);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks))
    rearrangeTask()
};


const createTask = () => {

    if (input.value === "") {
        return
    }

    if(tasks.length === 5) {
        alert("You cannot have more than 5 tasks!")
        return
    }

    const taskValue = input.value
    const task = createElements({value: taskValue, isDone: false})
    cont.appendChild(task)
    tasks.unshift({value: taskValue, isDone: false})
    localStorage.setItem("tasks", JSON.stringify(tasks))

    input.value = ""

    rearrangeTask()
}

const createElements = (taskObject) => {
    const task = document.createElement("div");
    task.classList.add("task")

    const textCont = document.createElement("div")
    textCont.classList.add("text-cont")
    task.appendChild(textCont)

    const btnCont = document.createElement("div")
    btnCont.classList.add("btn-cont")
    task.appendChild(btnCont)

    const text = document.createElement("p")
    text.classList.add("text")
    textCont.appendChild(text)
    text.innerHTML = taskObject.value

    const tacnik = document.createElement("img")
    tacnik.src = "tacnik.png"
    tacnik.classList.add("symbol")
    btnCont.appendChild(tacnik)
    tacnik.addEventListener("click", () => markTask(taskObject))

    if (taskObject.isDone) {
        task.classList.add("ended");
        tacnik.classList.add("none")
    }

    const iks = document.createElement("img")
    iks.src = "iks.png"
    iks.classList.add("symbol")
    btnCont.appendChild(iks)
    iks.addEventListener("click", () => deleteTask(taskObject))

    return task
}

const apiUrl = 'https://zenquotes.io/api/random';

fetch(apiUrl)
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    const quote = data[0].q;
    const author = data[0].a;
    input.placeholder = author + ": " + quote 
})
.catch(error => {
    console.error('Došlo je do greške:', error);
});

button.addEventListener("click", createTask)

document.addEventListener("DOMContentLoaded", rearrangeTask)