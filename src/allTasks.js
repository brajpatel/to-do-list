export const allTasksContainer = document.createElement('div');
allTasksContainer.setAttribute('id', 'all-tasks-container');
allTasksContainer.classList.add('all-tasks-container');

const noTasksMessage = document.createElement('div');
noTasksMessage.classList.add('no-items-message');
noTasksMessage.innerHTML = `<p>Uh oh.. Looks like you haven\'t got any tasks left!</p><p>( ⚆ _ ⚆ )</p>`;

export const tasks = [
    {
        title: 'Ab Workout',
        details: 'Three rounds of 3 minutes, 1 minute rest intervals',
        dueDate: '2022-11-16',
        priority: 'low_priority'
    },
    {
        title: 'Complete To-do Project',
        details: 'Complete To-do Project',
        dueDate: '2022-11-08',
        priority: 'high_priority'
    },
    {
        title: 'Blood Donation Appointment',
        details: 'Donate your bloods',
        dueDate: '2022-12-23',
        priority: 'low_priority'
    }
];

(function() {
    createTaskCard(tasks[0]);
    createTaskCard(tasks[1]);
    createTaskCard(tasks[2]);
})();

export function createTaskCard(task) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    switch(task.priority) {
        case 'low_priority':
            taskItem.classList.add('low');
            break;
        
        case 'medium_priority':
            taskItem.classList.add('medium');
            break;

        case 'high_priority':
            taskItem.classList.add('high');
            break;
    }

    const taskCheckbox = document.createElement('div');
    taskCheckbox.classList.add('task-checkbox');
    taskCheckbox.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    taskCheckbox.addEventListener('click', () => {
        taskCheckbox.classList.toggle('completed');

        if(taskCheckbox.classList.contains('completed')) {
            taskItem.classList.add('completed');
            taskCheckbox.innerHTML = `<i class="fa-solid fa-check"></i>`;
            taskTitle.innerHTML = `<s>${task.title}</s>`;
            taskDetails.innerHTML = `<s>${task.details}</s>`;
            taskDueDate.innerHTML = `<s>Due date: ${task.dueDate}</s>`
        }
        else {
            taskItem.classList.remove('completed');
            taskCheckbox.innerHTML = `<i class="fa-solid fa-minus"></i>`;
            taskTitle.textContent = task.title;
            taskDetails.textContent = task.details;
            taskDueDate.innerHTML = `Due date: ${task.dueDate}`;
        }

    })

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');

    const taskTitle = document.createElement('h2');
    taskTitle.textContent = task.title;

    const taskDetails = document.createElement('p');
    taskDetails.textContent = task.details;

    taskInfo.appendChild(taskTitle);
    taskInfo.appendChild(taskDetails);

    const taskDueDate = document.createElement('p');
    taskDueDate.classList.add('task-due-date');
    taskDueDate.innerHTML = `Due date: ${task.dueDate}`;

    const removeTaskBtn = document.createElement('button');
    removeTaskBtn.classList.add('remove-task-btn');
    removeTaskBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    removeTaskBtn.addEventListener('click', () => {
        removeTask(taskItem, task.title);
    });

    // append details to card
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskInfo);
    taskItem.appendChild(taskDueDate);
    taskItem.appendChild(removeTaskBtn);

    // append card to container
    allTasksContainer.appendChild(taskItem);
}

function removeTask(task, taskTitle) {
    allTasksContainer.removeChild(task);

    let index = tasks.indexOf(tasks.find(item => item.title === taskTitle));
    tasks.splice(index, 1);

    if(allTasksContainer.childElementCount === 0) {
        allTasksContainer.appendChild(noTasksMessage);
    }
}

export function checkContainerSize() {
    if(allTasksContainer.childElementCount > 1) {
        allTasksContainer.removeChild(noTasksMessage);
    }
}

function loadAllTasks() {
    const main = document.getElementById('main');
    main.textContent = '';
    main.appendChild(allTasksContainer);

    return main;
}

export default loadAllTasks;