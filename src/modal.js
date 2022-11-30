import loadNewTaskForm from "./newTaskForm";
import loadNewProjectForm from "./newProjectForm";
import loadNewNoteForm from "./newNoteForm";

function addModalBtnEvent() {
    const newTaskBtn = document.getElementById('new-task-btn');
    newTaskBtn.addEventListener('click', (e) => {
        if(e.target.classList.contains('active')) return;
        activateModalBtn(newTaskBtn);
        loadNewTaskForm();
    })

    const newProjectBtn = document.getElementById('new-project-btn');
    newProjectBtn.addEventListener('click', (e) => {
        if(e.target.classList.contains('active')) return;
        activateModalBtn(newProjectBtn);
        loadNewProjectForm();
    })

    const newNoteBtn = document.getElementById('new-note-btn');
    newNoteBtn.addEventListener('click', (e) => {
        if(e.target.classList.contains('active')) return;
        activateModalBtn(newNoteBtn);
        loadNewNoteForm();
    })
}

function activateModalBtn(btn) {
    const buttons = document.querySelectorAll('.modal-option');

    buttons.forEach((button) => {
        if(button !== this) {
            button.classList.remove('active');
        }
    })

    btn.classList.add('active');
}

function showModal() {
    const modalContainer = document.getElementById('modal-container');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const exitModal = document.getElementById('exit-modal');

    modalContainer.classList.add('show');
    modal.classList.add('show');
    overlay.classList.add('show');

    overlay.addEventListener('click', hideModal);
    exitModal.addEventListener('click', hideModal);

    addModalBtnEvent();
    activateModalBtn(document.querySelector('.modal-option'));
    loadNewTaskForm();
}

export function hideModal() {
    const modalContainer = document.getElementById('modal-container');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');

    modalContainer.classList.remove('show');
    modal.classList.remove('show');
    overlay.classList.remove('show');
}

export default showModal;