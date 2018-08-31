console.log('Starting notes.js');
const fs = require('fs');

//reusable function tanımladık
var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-date.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
}

var saveNotes = () => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  //tekrar eden veri varsa bunu dublicatedNotes verisine ekleyecek.
  var dublicateNotes = notes.filter((note) => note.title === title);

  if (dublicateNotes.length === 0) {
    notes.push(note);
    saveNotes();
    return note;
  }
};

var getAll = () => {
  console.log('Getting all notes');
};

var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  console.log('---');
  console.log(`Title ${note.title}`);
  console.log(`Body ${note.body}`);""
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
