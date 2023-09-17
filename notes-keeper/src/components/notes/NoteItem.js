import React, { useContext } from 'react';
import noteContext from '../../context/notes/noteContext';

// Component to display a single note item
export default function NoteItem(props) {
    // Access the deleteNote function from the noteContext
    const { deleteNote } = useContext(noteContext);
    const { note, updateNote } = props;

    return (
        <div className='col-md-4'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">Title - {note.title}</h5>
                    <p className="card-text">Description - {note.description}</p>

                    {/* Button to delete a note */}
                    <i
                        className="fa fa-trash-o"
                        onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Note Deleted", "success");
                        }}
                    ></i>

                    {/* Button to update a note */}
                    <i
                        className="fa fa-pencil-square-o mx-3"
                        onClick={() => {
                            updateNote(note);
                        }}
                    ></i>
                </div>
            </div>
        </div>
    )
}