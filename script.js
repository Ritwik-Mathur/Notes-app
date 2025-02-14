document.addEventListener("DOMContentLoaded", function () {
    loadNotes();
    loadEmojis();
});

// Toggle Dark/Light mode
function toggleTheme() {
    document.body.classList.toggle("light-mode");
    let modeBtn = document.getElementById("modeToggle");
    modeBtn.innerText = document.body.classList.contains("light-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// Add a new note with a heading
function addNote() {
    let noteHeading = document.getElementById("noteHeading").value.trim();
    let noteInput = document.getElementById("noteInput").value.trim();
    let notesContainer = document.getElementById("notesContainer");

    if (noteHeading === "" || noteInput === "") {
        alert("Please enter a heading and note content.");
        return;
    }

    let note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <h3>${noteHeading}</h3>
        <p>${noteInput}</p>
        <button class="download-btn" onclick="downloadNote(this)">📥 Download</button>
        <button class="delete-btn" onclick="deleteNote(this)">🗑️ Delete</button>
    `;

    notesContainer.appendChild(note);
    saveNoteToLocalStorage(noteHeading, noteInput);
    document.getElementById("noteHeading").value = "";
    document.getElementById("noteInput").value = "";
}

// Delete a note
function deleteNote(button) {
    let note = button.parentElement;
    note.remove();
}

// Clear all notes
function clearAllNotes() {
    document.getElementById("notesContainer").innerHTML = "";
    localStorage.removeItem("notes");
}

// Save note to local storage
function saveNoteToLocalStorage(heading, content) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ heading, content });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Load notes from local storage
function loadNotes() {
    let notesContainer = document.getElementById("notesContainer");
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach(note => {
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.innerHTML = `
            <h3>${note.heading}</h3>
            <p>${note.content}</p>
            <button class="download-btn" onclick="downloadNote(this)">📥 Download</button>
            <button class="delete-btn" onclick="deleteNote(this)">🗑️ Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

// Load emoji keyboard
function loadEmojis() {
    let emojis = ["😀", "😂", "😍", "😊", "😎", "🔥"];
    let emojiKeyboard = document.getElementById("emojiKeyboard");

    emojis.forEach(emoji => {
        let emojiBtn = document.createElement("span");
        emojiBtn.innerHTML = emoji;
        emojiBtn.onclick = function () {
            document.getElementById("noteInput").value += emoji;
        };
        emojiKeyboard.appendChild(emojiBtn);
    });
}

function toggleEmojiKeyboard() {
    let emojiKeyboard = document.getElementById("emojiKeyboard");
    emojiKeyboard.style.display = emojiKeyboard.style.display === "block" ? "none" : "block";
}
