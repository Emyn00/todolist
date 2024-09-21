const button = document.getElementById("button");
const cont = document.getElementById("taskCont")
const input = document.getElementById("input")

const tasks = []
localStorage.setItem("tasks", JSON.stringify(tasks))

const rearrangeTask = () => {
    cont.innerHTML = ""
    tasks.forEach((task) => {
        cont.appendChild(task)
    })
}

const deleteTask = (task) => {
    if (tasks.indexOf(task) > -1) {
        tasks.splice(tasks.indexOf(task), 1);
        rearrangeTask();
    }
};

const markTask = (task, tacnik) => {
    task.classList.add("ended");
    tacnik.style.display = "none";
    tasks.push(tasks.splice(tasks.indexOf(task), 1)[0]); 
    rearrangeTask();
};

const createTask = () => {

    if(input.value === "") {
        return
    }

    const task = document.createElement("div");
    task.classList.add("task")
    cont.appendChild(task);

    const textCont = document.createElement("div")
    textCont.classList.add("text-cont")
    task.appendChild(textCont)

    const btnCont = document.createElement("div")
    btnCont.classList.add("btn-cont")
    task.appendChild(btnCont)

    const text = document.createElement("p")
    text.classList.add("text")
    textCont.appendChild(text)
    text.innerHTML = input.value

    const tacnik = document.createElement("img")
    tacnik.src = "tacnik.png"
    tacnik.classList.add("symbol")
    btnCont.appendChild(tacnik)
    tacnik.addEventListener("click",() => markTask(task, tacnik))

    const iks = document.createElement("img")
    iks.src = "iks.png"
    iks.classList.add("symbol")
    btnCont.appendChild(iks)
    iks.addEventListener("click",() => deleteTask(task))

    let storedTasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.unshift(task)
    localStorage.setItem("tasks", JSON.stringify(storedTasks))

    input.value = ""

    rearrangeTask()
}

button.addEventListener("click", createTask)