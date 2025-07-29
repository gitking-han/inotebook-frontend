import React, { useContext } from 'react'
import noteContext from '../context/NoteContext';
const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className='col-md-3 my-3'>

            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{note.title}</h5>

                        <div>
                            <i style={{ fontSize: "15px" }} className="fa-solid fa-trash mx-3" onClick={() => {
                                deleteNote(note._id);
                                props.showAlert("Deleted Successfuly", "success");

                            }}></i>
                            <i style={{ fontSize: "15px" }} className="fa-solid fa-pen-to-square mx-1" onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>
                    <p className="card-text">
                        {note.description}
                    </p>

                </div>
            </div>

        </div>
    )
}

export default Noteitem
