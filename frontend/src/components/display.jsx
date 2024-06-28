import React, { useState } from "react";
import "./display.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function DisplayTask(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(props.task);
  const [content, setContent] = useState(props.content);

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0'); 
  const seconds = String(now.getSeconds()).padStart(2, '0');

  function removeTask() {
    props.onDelete(props.id,props.task);
  }

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function saveTask() {
    setIsEditing(false);
  }

  return (
    <div className="note">
      {isEditing ? (
        <div className="editarea">
          <input 
            type="text" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            className="edit-input"
          />
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="edit-textarea"
          />
          <button className="button save" onClick={saveTask}><SaveIcon fontSize="small"/></button>
        </div>
      ) : (
        <>
          <h2>{task}</h2>
          <p>{content}</p>
          <p className="date">{hours}:{minutes}:{seconds}</p>
          <div className="deledit">
          <button className="button delete" onClick={removeTask}><DeleteIcon fontSize="small"/></button>
          <button className="button edit" onClick={toggleEdit}><EditIcon fontSize="small"/></button>
          </div>
        </>
      )}
    </div>
  );
}

export default DisplayTask;
