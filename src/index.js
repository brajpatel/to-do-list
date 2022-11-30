import loadAllTasks from "./allTasks";
import loadNotes from "./notes";
import showModal from "./modal";

function toggleNav() {
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

function addNavBtnEvent() {
    const allTasksBtn = document.getElementById('all-tasks-btn');
    allTasksBtn.addEventListener('click', (e) => {
        if(e.target.classList.contains('active')) return;
        activateNavBtn(allTasksBtn);
        loadAllTasks();
    })

    const notesBtn = document.getElementById('notes-btn');
    notesBtn.addEventListener('click', (e) => {
        if(e.target.classList.contains('active')) return;
        activateNavBtn(notesBtn);
        loadNotes();
    })

    const openModalBtn = document.getElementById('open-modal-btn');
    openModalBtn.addEventListener('click', showModal);
}

export function activateNavBtn(btn) {
    const buttons = document.querySelectorAll('.nav-btn');

    buttons.forEach((button) => {
        if(button !== this) {
            button.classList.remove('active');
        }
    })

    btn.classList.add('active');
}

function initialisePage() {
    toggleNav();
    addNavBtnEvent();
    activateNavBtn(document.querySelector('.nav-btn'));
    loadAllTasks();
}

initialisePage();