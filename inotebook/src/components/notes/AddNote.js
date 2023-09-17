import React, { useContext, useState } from 'react';
import noteContext from '../../context/notes/noteContext';

function AddNote(props) {
    // Access the addNote function from the noteContext
    const { addNote } = useContext(noteContext);

    // Initialize state for note properties (title, description, tag)
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    // Function to update state when input values change
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    // Function to handle adding a note
    const handleAddNote = (e) => {
        e.preventDefault();
        // Call the addNote function from the context and pass note properties
        addNote(note.title, note.description, note.tag);
        // Clear the input fields after adding the note
        setNote({ title: "", description: "", tag: "" });
        // Show an alert to indicate that the note has been added successfully
        props.showAlert("Note Added", "success");
    }

    return (
        <div className="container my-3">
            <h2>Add A Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="noteTitle" className="form-label">Enter The Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="noteTitleid"
                        name="title"
                        onChange={onChange}
                        minLength={5}
                        required
                        value={note.title}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="noteDescription" className="form-label">Enter The Description</label>
                    <input
                        type='text'
                        className="form-control"
                        id="noteDescriptionid"
                        name="description"
                        onChange={onChange}
                        minLength={5}
                        required
                        value={note.description}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="noteTag" className="form-label">Enter The Tag</label>
                    <input
                        type='text'
                        className="form-control"
                        id="noteTagid"
                        name="tag"
                        onChange={onChange}
                        minLength={5}
                        required
                        value={note.tag}
                    />
                </div>

                {/* Disable the button if any of the input values are less than 5 characters */}
                <button
                    disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5}
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleAddNote}
                >
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default AddNote;