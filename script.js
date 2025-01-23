const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const showCompletedCheckbox = document.getElementById('showCompletedCheckbox');

let tasks = [];

// Load tasks from local storage (if available)
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

// Add Task Function
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasksToLocalStorage(); 
    displayTasks();
    taskInput.value = '';
}

// Display Tasks Function
function displayTasks() {
    taskList.innerHTML = ''; 

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            saveTasksToLocalStorage(); 
            displayTasks(); 
        });

        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm float-right';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            removeTask(task.id);
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskTextElement);
        listItem.appendChild(deleteBtn);

        taskList.appendChild(listItem);
    });
}

// Remove Task Function
function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToLocalStorage(); 
    displayTasks();
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', addTask);
displayTasks();