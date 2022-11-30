import { hideModal } from "./modal";
import { createNoteCard, checkContainerSize } from "./notes";

class Note {
    constructor(title, details) {
        this.title = title;
        this.details = details;
    }
}

function createTitleInput() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('align-center');

    const noteTitleInput = document.createElement('input');
    noteTitleInput.setAttribute('id', 'note-title-input');
    noteTitleInput.classList.add('title-input');
    noteTitleInput.placeholder = 'Note Title: e.g. Grocery List';
    noteTitleInput.required =  true;

    inputContainer.appendChild(noteTitleInput);

    return inputContainer;
}

function createDetailsInput() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('align-center');

    const noteDetailsInput = document.createElement('textarea');
    noteDetailsInput.setAttribute('id', 'note-details-input');
    noteDetailsInput.classList.add('details-input');
    noteDetailsInput.placeholder = 'Note Details: e.g. Broccoli, Mushrooms, Carrots';
    noteDetailsInput.required =  true;
    noteDetailsInput.contentEditable = true;

    inputContainer.appendChild(noteDetailsInput);

    return inputContainer;
}

function createConfirmNoteBtn() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('align-center');

    const confirmNewNoteBtn = document.createElement('button');
    confirmNewNoteBtn.type = 'button';
    confirmNewNoteBtn.textContent = 'Confirm Note';
    confirmNewNoteBtn.classList.add('confirm-new-item-btn');
    confirmNewNoteBtn.addEventListener('click', getUserInput);

    inputContainer.appendChild(confirmNewNoteBtn);

    return inputContainer;
}

function getUserInput() {
    const noteTitleInput = document.getElementById('note-title-input').value;
    const noteDetailsInput = document.getElementById('note-details-input').value;

    if(noteTitleInput === '' || noteDetailsInput === '') {
        alert('Please fill in all parts of the form.')
    }
    else {
        const newNote = new Note(noteTitleInput, noteDetailsInput);

        createNoteCard(newNote);
        hideModal();
        formComplete();
        checkContainerSize();
    }
}

function formComplete() {
    const noteFormComplete = document.getElementById('note-form-complete');

    setTimeout(() => {
        noteFormComplete.classList.add('show');
    }, 250);

    setTimeout(() => {
        noteFormComplete.classList.remove('show');
    }, 4000);
}

function createNewNoteForm() {
    const newNoteForm = document.createElement('form');
    newNoteForm.setAttribute('id', 'new-note-form');
    newNoteForm.classList.add('new-note-form');

    newNoteForm.appendChild(createTitleInput());
    newNoteForm.appendChild(createDetailsInput());
    newNoteForm.appendChild(createConfirmNoteBtn());
    
    return newNoteForm;
}

function loadNewNoteForm() {
    const formContainer = document.getElementById('form-container');
    formContainer.textContent = '';
    formContainer.appendChild(createNewNoteForm());

    return formContainer;
}

export default loadNewNoteForm;