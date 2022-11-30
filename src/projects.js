import { activateNavBtn } from ".";
import { formComplete } from "./newTaskForm";
import { allTasksContainer, createTaskCard, loadAllTasks } from "./allTasks";

const projectsWrapper = document.getElementById('projects-wrapper');

class ProjectTask {
    constructor(title, details, dueDate, priority) {
        this.title = title;
        this.details = details;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export const projects = [
    {
        title: 'Workout'
    },
    {
        title: 'Another project'
    }
];

function createFillerProjectTabs() {
    createProjectTab(projects[0]);
    createProjectTab(projects[1]);
}

createFillerProjectTabs();

function createOpenProjectTaskModalBtn(container) {
    const openProjectTaskModalBtn = document.createElement('button');
    openProjectTaskModalBtn.classList.add('open-modal-btn');
    openProjectTaskModalBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    openProjectTaskModalBtn.addEventListener('click', () => {
        showProjectTaskModal(container);
    });

    return openProjectTaskModalBtn;
}

function showProjectTaskModal(container) {
    const modalContainer = document.getElementById('modal-container');
    const projectTaskModal = document.getElementById('project-task-modal');
    const overlay = document.getElementById('overlay');
    const exitProjectTaskModal = document.getElementById('exit-project-task-modal');

    const confirmProjectTaskBtn = document.getElementById('confirm-project-task');
    confirmProjectTaskBtn.addEventListener('click', () => {
        getuserInput(container);
    })

    modalContainer.classList.add('show');
    projectTaskModal.classList.add('show');
    overlay.classList.add('show');

    overlay.addEventListener('click', hideProjectTaskModal);
    exitProjectTaskModal.addEventListener('click', hideProjectTaskModal);
}

function hideProjectTaskModal() {
    const modalContainer = document.getElementById('modal-container');
    const projectTaskModal = document.getElementById('project-task-modal');
    const overlay = document.getElementById('overlay');

    modalContainer.classList.remove('show');
    projectTaskModal.classList.remove('show');
    overlay.classList.remove('show');
}

function createDeleteProjectBtn(tab, container) {
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.classList.add('delete-project-btn');
    deleteProjectBtn.innerHTML = `<i id="exit-project-modal" class="fa-solid fa-xmark"></i>`;

    const main = document.getElementById('main');

    deleteProjectBtn.addEventListener('click', () => {
        projectsWrapper.removeChild(tab);
        main.removeChild(container);
        main.appendChild(allTasksContainer);

        activateNavBtn(document.querySelector('.nav-btn'));
    })

    return deleteProjectBtn;
}

export function createProjectTab(project) {
    const projectTab = document.createElement('li');
    projectTab.classList.add('nav-btn');
    projectTab.classList.add('projects-tab');
    projectTab.textContent = project.title;
    projectTab.addEventListener('click', () => {
        activateNavBtn(projectTab);
        loadProject(projectContainer);
    })

    projectsWrapper.appendChild(projectTab);

    const projectContainer = document.createElement('div');
    projectContainer.setAttribute('id', project.title.toLowerCase().replace(' ', '-'));
    projectContainer.classList.add('project-container');

    const projectContainerFirstRow = document.createElement('div');
    projectContainerFirstRow.classList.add('align-center');
    projectContainerFirstRow.appendChild(createOpenProjectTaskModalBtn(projectContainer));
    projectContainerFirstRow.appendChild(createDeleteProjectBtn(projectTab, projectContainer));

    projectContainer.appendChild(projectContainerFirstRow);
}

function loadProject(project) {
    const main = document.getElementById('main');
    main.textContent = '';
    main.appendChild(project);

    return main;
}

function getuserInput(container) {
    const taskTitleInput = document.getElementById('project-task-title-input').value;
    const taskDetailsInput = document.getElementById('project-task-details-input').value;
    const taskDateInput = document.getElementById('project-task-date-input').value;
    const taskPriorityInput = document.querySelector('input[name="task-priority"]:checked').value;


    if(taskTitleInput === '' || taskDetailsInput === '') {
        alert('Please fill in all parts of the form');
    }
    else {
        const newTask = new ProjectTask(taskTitleInput, taskDetailsInput, taskDateInput, taskPriorityInput);

        createTaskCard(newTask);
        createProjectTaskCard(container, newTask);
        hideProjectTaskModal();
        formComplete();
    }
}

function createProjectTaskCard(container, task) {
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
        removeTask(container, taskItem);
    });

    // append details to card
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskInfo);
    taskItem.appendChild(taskDueDate);
    taskItem.appendChild(removeTaskBtn);

    // append card to container
    container.appendChild(taskItem);
}

function removeTask(container, task) {
    container.removeChild(task);
}