console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

/**
 * node app.js --help
 * node app.js add --help
 * node app.js add -t='flag title' --body='body'
 */

const titleOptions = {
  describe: 'Title of note',
  demand: true, //zorunlu olduğunu belirtmek için
  alias='t' //title için shortcut olarak kullanabiliriz.
};

const bodyOptions = {
  describe: 'Body of Note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all Notes')
  .command('read', 'Read a Note', {
    title: titleOptions
  })
  .command('remove', 'Remove a Note', {
    title: titleOptios
  })
  .help()
  .argv;


var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }

} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach(note => notes.logNote(note));

} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }

} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);

} else {
  console.log('Command not recognized');
}
