import React, { useState } from "react";
import "./addTask.css";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Zoom from '@mui/material/Zoom';

function AddTask(pram) {

  const [include, setInclude]= useState(false);

  const [note, setNote] = useState({
    task: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function submitNote(event) {
    event.preventDefault(); 
    pram.onAdd(note);
    setNote({
      task: "",
      content: "",
    });
  }

  function toExtend(){
    setInclude( true);
  }

  return (
    <div className="create-area">
      <form className="create-note">
        <input
          name="task"
          onClick={toExtend}
          onChange={handleChange}
          value={note.task}
          placeholder="Task"
          required
        />
        {
          include && <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Description"
          rows="3"
          required
        />
        }
        
      <Zoom in= {include} timeout={300}>
        <button onClick={submitNote}><AddCircleIcon /> </button>
      </Zoom>
      </form>
    </div>
  );
}

export default AddTask;
