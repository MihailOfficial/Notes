import React, { useEffect, useState } from "react";

import axios from "axios";
import Button from '@mui/material/Button';

function Note(curpost) {
  //hooks for editing state and new title/description info
  const [curID, setID] = React.useState(curpost.data.id);
  const [isEditing, setIsEditing] = useState(false)
  const [currentTitle, currentSetTitle] = React.useState(curpost.data.title);
  const [currentDesc, currentSetDesc] = React.useState(curpost.data.description);

  //edits a note
  const editNote = (id) => {
    //check to see if the changed note is valid
    if ((currentDesc.length + currentSetTitle) > 140) {
      window.alert("Note must be less than 140 characters!");
      return null;
    }
    //puts it in the database
    axios.put(`/api/notes/${id}`, {
      title: currentTitle, description: currentDesc
    }).then(res => {
      //set to false so that the input fields are hidden
      setIsEditing(false);
    });
  };

  //delete a specific note
  const deleteNote = id => {
    axios.delete(`/api/notes/${curID}`).then(res => {
      //loops back into App so that the note components are refreshed 
      curpost.met(curID);
    });
  }
  //two modes, either editing or displaying the info
  return (
    <div>
      {
        isEditing ?
          <div className="card">
            <form onSubmit={() => editNote(curID)}>
              <input type="title" onChange={event => currentSetTitle(event.target.value)} value={currentTitle} />
              <textarea onChange={event => currentSetDesc(event.target.value)} value={currentDesc} />
            </form>
            <Button variant="outlined" onClick={() => editNote(curID)}> Save </Button>
          </div>
          :
          <div className="card">
            <h2 onDoubleClick={() => setIsEditing(true)}>{currentTitle}</h2>
            <p onDoubleClick={() => setIsEditing(true)}>{currentDesc}</p>
            <Button variant="outlined" onClick={() => deleteNote(curID)}> Delete </Button>
          </div>

      }
    </div>);
}

export default Note;