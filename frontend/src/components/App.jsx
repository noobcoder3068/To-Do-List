import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import AddTask from "./addTask";
import DisplayTask from "./display";
import { addNotesDb, deleteNoteDB, getAllNotes } from "./indexDB.js";
import { useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    async function fetchdata(){
      const notesDB= await getAllNotes();
        setNotes(notesDB || []);
    }
    fetchdata();
  },[]);

  async function addNotes(note) {
    console.log(note);
    const id= await addNotesDb(note);
    setNotes((prevNotes) => {
      return [...prevNotes, {...note, id}];
    });
  }

  async function deleteNote(id,task){
    console.log("deleting task ",[task]);
    await deleteNoteDB(id);
    setNotes(prevNotes => {
        return prevNotes.filter((note) => {
          return note.id !== id;
        });
      });
  }

  return (
    <div>
      <Header />
      <AddTask onAdd={addNotes} />
      {notes.map((note) => (
        <DisplayTask
          key={note.id}
          id={note.id}
          task={note.task}
          content={note.content}
          onDelete= {deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
