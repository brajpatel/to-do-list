import { hideModal } from "./modal";
import { tasks, createTaskCard, checkContainerSize } from "./allTasks";

class Task {
    constructor(title, details, dueDate, priority) {
        this.title = title;
        this.details = details;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

function createTitleInput() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('align-center');

    const titleInput = document.createElement('input');
    titleInput.setAttribute('id', 'task-title-input');
    titleInput.classList.add('title-input');
    titleInput.placeholder = 'Task Title: e.g. Go for a run';
    titleInput.required =  true;


    inputContainer.appendChild(titleInput);

    return inputContainer;
}

function createDetailsInput() {
    const inputContainer = document.createElement('div');

    const detailsInput = document.createElement('textarea');
    detailsInput.setAttribute('id', 'task-details-input');
    detailsInput.classList.add('details-input');
    detailsInput.placeholder = 'Task Details: e.g. Run 3 kilometres, walk 1 kilometre';
    detailsInput.required =  true;

    inputContainer.appendChild(detailsInput);

    return inputContainer;
}

function createDateInput() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('date-input-container');
    inputContainer.classList.add('align-center');

    const dateLabel = document.createElement('h3')
    dateLabel.textContent = 'Due Date:';

    const dateInput = document.createElement('input');
    dateInput.setAttribute('id', 'task-date-input');
    dateInput.type = 'date';
    dateInput.classList.add('date-input');
    dateInput.required = true;

    inputContainer.appendChild(dateLabel);
    inputContainer.appendChild(dateInput);

    return inputContainer;
}

function createPriorityButtons() {
    const priorityBtnsContainer = document.createElement('div');
    priorityBtnsContainer.classList.add('priority-btns-container');
    priorityBtnsContainer.classList.add('align-center');

    const priorityContainerLabel = document.createElement('h3');
    priorityContainerLabel.textContent = 'Priority:';

    const lowPriorityBtn = document.createElement('input');
    lowPriorityBtn.type = 'radio';
    lowPriorityBtn.setAttribute('id', 'low-priority-btn');
    lowPriorityBtn.setAttribute('name', 'priority');
    lowPriorityBtn.classList.add('priority-btn');
    lowPriorityBtn.value = 'low_priority';

    const lowPriorityLabel = document.createElement('label');
    lowPriorityLabel.setAttribute('id', 'low-priority-label')
    lowPriorityLabel.setAttribute('for', 'low-priority-btn')
    lowPriorityLabel.textContent = 'Low';

    const medPriorityBtn = document.createElement('input');
    medPriorityBtn.type = 'radio';
    medPriorityBtn.setAttribute('id', 'med-priority-btn');
    medPriorityBtn.setAttribute('name', 'priority');
    medPriorityBtn.classList.add('priority-btn');
    medPriorityBtn.value = 'medium_priority';

    const medPriorityLabel = document.createElement('label');
    medPriorityLabel.setAttribute('id', 'med-priority-label');
    medPriorityLabel.setAttribute('for', 'med-priority-btn');
    medPriorityLabel.textContent = 'Medium';

    const highPriorityBtn = document.createElement('input');
    highPriorityBtn.type = 'radio';
    highPriorityBtn.setAttribute('id', 'high-priority-btn');
    highPriorityBtn.setAttribute('name', 'priority');
    highPriorityBtn.classList.add('priority-btn');
    highPriorityBtn.value = 'high_priority';

    const highPriorityLabel = document.createElement('label');
    highPriorityLabel.setAttribute('id', 'high-priority-label');
    highPriorityLabel.setAttribute('for', 'high-priority-btn');
    highPriorityLabel.textContent = 'High';

    priorityBtnsContainer.appendChild(priorityContainerLabel);
    priorityBtnsContainer.appendChild(lowPriorityBtn);
    priorityBtnsContainer.appendChild(lowPriorityLabel);
    priorityBtnsContainer.appendChild(medPriorityBtn);
    priorityBtnsContainer.appendChild(medPriorityLabel);
    priorityBtnsContainer.appendChild(highPriorityBtn);
    priorityBtnsContainer.appendChild(highPriorityLabel);

    return priorityBtnsContainer;
}

function createConfirmTaskBtn() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('align-center');

    const confirmNewTaskBtn = document.createElement('button');
    confirmNewTaskBtn.type = 'button';
    confirmNewTaskBtn.textContent = 'Confirm Task';
    confirmNewTaskBtn.classList.add('confirm-new-item-btn');
    confirmNewTaskBtn.addEventListener('click', getUserInput);

    inputContainer.appendChild(confirmNewTaskBtn);

    return inputContainer;
}

function getUserInput() {
    const taskTitleInput = document.getElementById('task-title-input').value;
    const taskDetailsInput = document.getElementById('task-details-input').value;
    const taskDateInput = document.getElementById('task-date-input').value;
    const taskPriorityInput = document.querySelector('input[name="priority"]:checked').value;


    if(taskTitleInput === '' || taskDetailsInput === '') {
        alert('Please fill in all parts of the form');
    }
    else {
        const newTask = new Task(taskTitleInput, taskDetailsInput, taskDateInput, taskPriorityInput);

        tasks.push(newTask);
        createTaskCard(newTask);
        checkContainerSize();
        hideModal();
        formComplete();
    }
}

export function formComplete() {
    const taskFormComplete = document.getElementById('task-form-complete');

    setTimeout(() => {
        taskFormComplete.classList.add('show');
    }, 250);

    setTimeout(() => {
        taskFormComplete.classList.remove('show');
    }, 4000);
}

function createNewTaskForm() {
    const newTaskForm = document.createElement('form');
    newTaskForm.setAttribute('id', 'new-task-form');
    newTaskForm.classList.add('new-task-form');
    
    newTaskForm.appendChild(createTitleInput());
    newTaskForm.appendChild(createDetailsInput());
    newTaskForm.appendChild(createDateInput());
    newTaskForm.appendChild(createPriorityButtons());
    newTaskForm.appendChild(createConfirmTaskBtn());

    return newTaskForm;
}

function loadNewTaskForm() {
    const formContainer = document.getElementById('form-container');
    formContainer.textContent = '';
    formContainer.appendChild(createNewTaskForm());

    return formContainer;
}

export default loadNewTaskForm;