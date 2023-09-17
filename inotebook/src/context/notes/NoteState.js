import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // Define the host URL for API calls
  const host = 'http://localhost/';

  // Initialize the state for notes
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // Fetch All Notes from the API
  const fetchNotes = async (id) => {
    const url = `${host}api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "jwt-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  // Add a New Note using the API
  const addNote = async (title, description, tag) => {
    const url = `${host}api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        "jwt-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes([...notes, note]);
  }

  // Delete a Note using the API
  const deleteNote = async (id) => {
    const url = `${host}api/notes/deletenotes/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
        "jwt-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  }

  // Edit a Note using the API
  const editNote = async (id, title, description, tag) => {
    const url = `${host}api/notes/updatenotes/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json",
        "jwt-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    // Update the notes in the state
    const newNotes = notes.map((note) => {
      if (note._id === id) {
        return {
          ...note,
          title,
          description,
          tag
        };
      }
      return note;
    });

    setNotes(newNotes);
  }

  return (
    // Provide the notes state and related functions through the context
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;