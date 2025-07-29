import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
  }, [navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note Added Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2 className="mb-4">➕ Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            required
            rows={3}
            minLength={5}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            required
            minLength={3}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={note.title.length < 5 || note.description.length < 5}
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
