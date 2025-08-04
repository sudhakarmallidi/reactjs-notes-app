import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([{"sno": "1", "text": "Note 1"}]);

  function addNoteHandler() {
     if (note === null || note.trim() === "") {
      alert("Please enter a valid note.");
      return;   
     }
    console.log("Before updateding notes.....:", notes);

    const newNote = {
      sno: (notes.length + 1).toString(),
      text: note  
    };
    setNotes([...notes, newNote]);
    setNote(""); // Clear the input field after adding the note
    console.log("After updateding notes.....:", notes);
  }

  function textChangeHandler(e) {
    if (e.target.value !== null) {
      setNote(e.target.value);
    } else {
      console.log("Please enter a valid note.");
    }
  }

  function deleteHandler(idx) {
    const updatedNotes = notes.filter((_, index) => index !== idx);
    setNotes(updatedNotes);
  } 

  function editHandler(idx) {
    const existingNote = notes[idx];
    const updatedtext = prompt("Edit your note:", existingNote.text);

    if (updatedtext !== null) {
      const updatedNote = {
        sno: existingNote.sno,
        text: updatedtext.trim()
      };

      const updatedNotes = notes.map((note, index) =>
        index === idx ? updatedNote : note
      );
      setNotes(updatedNotes);
    }
  }

  useEffect(() => {
    console.log("**********Notes have been updated: ", notes);
}, [notes]);

  return (
    <div className="App">
      <h1>My Notes App </h1>
      <h1></h1>
      <input type="text" value= {note} onChange={textChangeHandler} placeholder="Enter your note here..." />
      <button onClick={addNoteHandler}>Add Note</button>
      <div className="notes-list">
        {notes.map((note, idx) => (
          <div className="note-item" key={idx}>
            <label className="sno-label"> {note.sno} </label> <label> {note.text} </label> 
            <button className="edit-button" onClick={() => editHandler(idx)}> Edit  </button>
            <button className="delete-button" onClick={() => deleteHandler(idx)}> Delete </button>
          </div>
        ))}
      </div>
      <footer className="footer"  hidden={notes.length !== 0}>
        <p>Please add some notes. </p>
      </footer>
     
    </div>
  );
}

export default App;
