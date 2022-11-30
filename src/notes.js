const allNotesContainer = document.createElement('div');
allNotesContainer.setAttribute('id', 'all-notes-container');
allNotesContainer.classList.add('all-notes-container');

const noNotesMessage = document.createElement('div');
noNotesMessage.classList.add('no-items-message');
noNotesMessage.innerHTML = `<p>Uh oh.. There doesn't seem to be any notes around here!</p><p>( ⚆ _ ⚆ )</p>`;

const fillerNotes = [
    {
        title: 'Groceries',
        details: 'Milk, Cheese, Mushrooms, Tomatoes, Sweetcorn, Macaroni'
    },
    {
        title: 'Ab Workout',
        details: 'Plank, Russian twist, Bicycle crunches, Leg flutters'
    },
    {
        title: 'Upper-body Workout',
        details: 'Psuedo pushups, Dumbell bench press, Dumbell flys, Bicep curls, Hammer curls'
    },
    {
        title: 'Cardio',
        details: 'Star jumps, Criss-crosses, Running, Burpees, Ladder runs'
    },
    {
        title: 'Japanese Study',
        details: 'Duolingo, Memrise, Read \'Spy X Family\' Manga, Watch \'Lycoris Recoil\', JP From Zero'
    }
]

function createFillerNotes() {
    createNoteCard(fillerNotes[0]);
    createNoteCard(fillerNotes[1]);
    createNoteCard(fillerNotes[2]);
    createNoteCard(fillerNotes[3]);
    createNoteCard(fillerNotes[4]);
}

createFillerNotes();

export function createNoteCard(note) {
    const noteCard = document.createElement('div');
    noteCard.classList.add('note-card');

    const noteCardTitle = document.createElement('h2');
    noteCardTitle.textContent = note.title;
    noteCardTitle.contentEditable = true;

    const noteCardDetails = document.createElement('p');
    noteCardDetails.textContent = note.details.split(' ').join('\n');
    noteCardDetails.contentEditable = true;

    const removeNoteBtn = document.createElement('button');
    removeNoteBtn.classList.add('remove-note-btn');
    removeNoteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    removeNoteBtn.addEventListener('click', () => {
        removeNote(noteCard);
    })

    noteCard.appendChild(noteCardTitle);
    noteCard.appendChild(noteCardDetails);
    noteCard.appendChild(removeNoteBtn);

    // append notecard to container
    allNotesContainer.appendChild(noteCard);
}

function removeNote(note) {
    allNotesContainer.removeChild(note);

    if(allNotesContainer.childElementCount === 0) {
        allNotesContainer.appendChild(noNotesMessage);
    }
}

export function checkContainerSize() {
    if(allNotesContainer.childElementCount > 1) {
        allNotesContainer.removeChild(noNotesMessage);
    }
}

function loadNotes() {
    const main = document.getElementById('main');
    main.textContent = '';
    main.appendChild(allNotesContainer);

    return main;
}

export default loadNotes;