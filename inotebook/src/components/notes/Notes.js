import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes(props) {
    const history = useNavigate();
    const { notes, fetchNotes, editNote } = useContext(noteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        // Fetch notes only if the user is logged in
        if (localStorage.getItem('token')) {
            fetchNotes();
        } else {
            // Redirect to login page if not logged in
            history('/login');
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    // Function to open the edit note modal and populate with current note data
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    }

    // Function to update state when input values change
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    // Function to handle updating a note
    const handleUpdateNote = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Update Successful", "success");
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            {/* Pop Up For Editing Notes */}
            <button type="button" className=" btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Edit Note Form */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="noteTitle" className="form-label">Enter The Title</label>
                                    <input type="text" className="form-control" id="enoteTitleid" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="noteDescription" className="form-label">Enter The Description</label>
                                    <input type='text' className="form-control" id="enoteDescriptionid" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="noteTag" className="form-label">Enter The Tag</label>
                                    <input type='text' className="form-control" id="enoteTagid" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            {/* Disable the button if any of the input values are less than 5 characters */}
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 5} type="button" className="btn btn-primary" onClick={handleUpdateNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'No Notes Available To Display'}
                </div>
                {notes.map((note) => (
                    <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                ))}
            </div>
        </>
    )
}