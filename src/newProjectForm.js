import { hideModal } from "./modal";
import { projects, createProjectTab } from "./projects";

class Project {
    constructor(title) {
        this.title = title;
    }
}

function createTitleInput() {
    const inputContainer = document.createElement('div')
    inputContainer.classList.add('align-center');

    const projectTitleInput = document.createElement('input');
    projectTitleInput.setAttribute('id', 'project-title-input');
    projectTitleInput.classList.add('title-input');
    projectTitleInput.placeholder = 'Project Title: e.g. Workout';
    projectTitleInput.required =  true;

    inputContainer.appendChild(projectTitleInput);

    return inputContainer;
}

function createConfirmProjectBtn() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('align-center');

    const confirmNewProjectBtn = document.createElement('button');
    confirmNewProjectBtn.type = 'button';
    confirmNewProjectBtn.textContent = 'Confirm Project';
    confirmNewProjectBtn.classList.add('confirm-new-item-btn');
    confirmNewProjectBtn.addEventListener('click', getUserInput);

    inputContainer.appendChild(confirmNewProjectBtn);

    return inputContainer;
}

function getUserInput() {
    const projectTitleInput = document.getElementById('project-title-input').value;

    if(projectTitleInput === '') {
        alert('Please fill in all parts of the form.');
    }
    else {
        const newProject = new Project(projectTitleInput);

        projects.push(newProject);
        createProjectTab(newProject);
        hideModal();
        formComplete();
    }
}

function formComplete() {
    const noteFormComplete = document.getElementById('project-form-complete');

    setTimeout(() => {
        noteFormComplete.classList.add('show');
    }, 250);

    setTimeout(() => {
        noteFormComplete.classList.remove('show');
    }, 4000);
}

function createNewProjectForm() {
    const newProjectForm = document.createElement('form');
    newProjectForm.setAttribute('id', 'new-project-form');
    newProjectForm.classList.add('new-project-form');

    newProjectForm.appendChild(createTitleInput());
    newProjectForm.appendChild(createConfirmProjectBtn());
    
    return newProjectForm;
}

function loadNewProjectForm() {
    const formContainer = document.getElementById('form-container');
    formContainer.textContent = '';
    formContainer.appendChild(createNewProjectForm());

    return formContainer;
}

export default loadNewProjectForm;