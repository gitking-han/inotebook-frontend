import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/NoteContext';
import Noteitem from './noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes = [], getNotes, editNote, searchQuery } = context; // ✅ Added searchQuery
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    setShowModal(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  };

  const closeModal = () => setShowModal(false);

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated Successfully", "success");
    closeModal();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // ✅ Filter notes based on search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Edit Note Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Edit Note</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <form className="mt-2">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                      required
                      minLength={5}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                      required
                      rows={3}
                      minLength={5}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                      required
                      minLength={3}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={note.etitle.length < 5 || note.edescription.length < 5}
                  onClick={handleClick}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Display */}
      <div className="container">
        <h2 className="mb-4">📒 Your Notes</h2>
        {filteredNotes.length === 0 ? (
          <h5 className="text-muted">No notes found</h5>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredNotes.map((note) => (
              <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
