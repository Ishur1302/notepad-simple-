document.addEventListener("DOMContentLoaded", loadNotes);

const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

addNoteBtn.addEventListener("click", addNote);

function addNote() {
    const note = document.createElement("div");
    note.classList.add("note");

    const textArea = document.createElement("textarea");
    textArea.placeholder = "Write your note here...";
    textArea.addEventListener("input", saveNotes);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    note.appendChild(textArea);
    note.appendChild(deleteBtn);
    notesContainer.appendChild(note);

    saveNotes();
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll(".note textarea").forEach(note => {
        notes.push(note.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(noteText => {
        addNote();
        document.querySelectorAll(".note textarea")[document.querySelectorAll(".note textarea").length - 1].value = noteText;
    });
}